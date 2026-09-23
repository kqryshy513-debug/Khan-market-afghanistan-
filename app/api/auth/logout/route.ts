import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { getSessionUserByToken, writeAuditLog } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const token = request.cookies.get('session')?.value;
  const user = await getSessionUserByToken(token);

  if (!user) {
    return NextResponse.json({ ok: false, error: 'Not authenticated' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true, data: { user } });
  response.cookies.set('session', '', { httpOnly: true, path: '/', maxAge: 0 });

  await db.session.deleteMany({ where: { userId: user.id } });
  await writeAuditLog('USER_LOGOUT', `Logout for ${user.email}`, user.id);

  return response;
}
