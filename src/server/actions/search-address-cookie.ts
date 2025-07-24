'use server';

import { cookies } from 'next/headers';

export async function setSearchAddress(address: string) {
  (await cookies()).set('search_address', address, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });

  return { success: true };
}

export async function getSearchAddress() {
  const cookie = (await cookies()).get('search_address');

  return cookie?.value || null;
}

export async function removeSearchAddress() {
  (await cookies()).delete('search_address');
}
