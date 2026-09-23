import { NextResponse } from 'next/server';

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export function jsonSuccess<T>(data: T, status = 200) {
  return NextResponse.json({ ok: true, data }, { status });
}
