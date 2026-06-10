import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';

const sessionOptions = {
  cookieName: 'awgp_admin_session',
  password: process.env.SESSION_SECRET || 'awgp-secret-change-in-production-min32chars',
  cookieOptions: { secure: process.env.NODE_ENV === 'production' },
};

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'awgp2025admin';

export async function POST(request) {
  const { password } = await request.json();

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ message: 'Incorrect password.' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  const session = await getIronSession(request, response, sessionOptions);
  session.isLoggedIn = true;
  await session.save();

  return response;
}
