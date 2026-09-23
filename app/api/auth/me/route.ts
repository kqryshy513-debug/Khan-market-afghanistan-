import { NextRequest, NextResponse } from 'next/server';

import { getSessionUserByToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const cookieStore = request.cookies;
  const token = cookieStore.get('session')?.value;

  if (!token) {
    return NextResponse.json({ ok: false, error: 'Not authenticated' }, { status: 401 });
  }

  const user = await getSessionUserByToken(token);
  if (!user) {
    return NextResponse.json({ ok: false, error: 'Session expired or invalid' }, { status: 401 });
  }

  return NextResponse.json({ ok: true, data: { user } });
}
