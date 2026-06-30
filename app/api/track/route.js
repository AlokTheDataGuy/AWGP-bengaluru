import { NextResponse } from 'next/server';
import { recordVisit } from '../../../lib/analytics';

const VISITOR_COOKIE = 'awgp_visitor';
const ONE_YEAR = 60 * 60 * 24 * 365;

export async function POST(request) {
  const existing = request.cookies.get(VISITOR_COOKIE);
  const isNew = !existing;

  try {
    recordVisit(isNew);
  } catch {
    // Never let analytics break a page load.
  }

  const response = NextResponse.json({ ok: true });

  if (isNew) {
    response.cookies.set(VISITOR_COOKIE, crypto.randomUUID(), {
      maxAge: ONE_YEAR,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
  }

  return response;
}
