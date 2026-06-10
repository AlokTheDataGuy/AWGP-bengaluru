import { NextResponse } from 'next/server';
import { readSection, writeSection } from '../../../../lib/content';

export async function GET(request, { params }) {
  const { section } = await params;
  try {
    const data = readSection(section);
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}

export async function POST(request, { params }) {
  const { section } = await params;
  try {
    const data = await request.json();
    writeSection(section, data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}
