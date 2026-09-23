import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { comparePassword, createSessionForUser, getSessionUserByToken, hashPassword, writeAuditLog } from '@/lib/auth';
import { validateLoginInput } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = validateLoginInput(body);

    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' }, { status: 400 });
    }

    const user = await db.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
    if (!user || !user.passwordHash) {
      return NextResponse.json({ ok: false, error: 'Invalid credentials' }, { status: 401 });
    }

    const validPassword = await comparePassword(parsed.data.password, user.passwordHash);
    if (!validPassword) {
      return NextResponse.json({ ok: false, error: 'Invalid credentials' }, { status: 401 });
    }

    const token = await createSessionForUser(user.id);
    const response = NextResponse.json({ ok: true, data: { email: user.email, role: user.role } }, { status: 200 });
    response.cookies.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    });

    await writeAuditLog('USER_LOGIN', `Login for ${user.email}`, user.id);
    return response;
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Login failed' }, { status: 500 });
  }
}

export async function GET() {
  const response = NextResponse.json({ ok: true, data: { message: 'Login endpoint is available' } });
  return response;
}
