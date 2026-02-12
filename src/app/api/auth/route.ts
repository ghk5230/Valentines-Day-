import { NextResponse } from 'next/server';
import { verifyPassphrase, setAuthCookie } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const passphrase = body?.passphrase;

    if (!passphrase || typeof passphrase !== 'string') {
      return NextResponse.json({ success: false, error: 'Missing passphrase' }, { status: 400 });
    }

    if (verifyPassphrase(passphrase)) {
      await setAuthCookie();
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
