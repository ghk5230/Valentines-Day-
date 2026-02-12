import { cookies } from 'next/headers';
import { createHash } from 'crypto';

export function hashPassphrase(passphrase: string): string {
  return createHash('sha256').update(passphrase.trim()).digest('hex');
}

export function verifyPassphrase(passphrase: string): boolean {
  const expected = (process.env.VALENTINE_PASSPHRASE_HASH ?? '').trim();
  return expected.length > 0 && hashPassphrase(passphrase) === expected;
}

export async function setAuthCookie(): Promise<void> {
  const token = (process.env.VALENTINE_AUTH_TOKEN ?? '').trim();
  (await cookies()).set('valentine_auth', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearAuthCookie(): Promise<void> {
  (await cookies()).delete('valentine_auth');
}
