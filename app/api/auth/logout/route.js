import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';

const sessionOptions = {
  cookieName: 'awgp_admin_session',
  password: process.env.SESSION_SECRET || 'awgp-secret-change-in-production-min32chars',
  cookieOptions: { secure: process.env.NODE_ENV === 'production' },
};

export async function POST(request) {
  const response = NextResponse.json({ ok: true });
  const session = await getIronSession(request, response, sessionOptions);
  session.destroy();
  return response;
}
