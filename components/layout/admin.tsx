import * as React from 'react';
import { LayoutProps } from '@/models';
import Link from 'next/link';
import { Auth } from '../common';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/router';

export function AdminLayout({ children }: LayoutProps) {
  const router = useRouter();
  const { profile, logout } = useAuth({ revalidateOnMount: false });
  async function handleLogoutClick() {
    try {
      await logout();
      console.log('Logout redirect to home page');
      router.push('/login');
    } catch (error) {
      console.log('failed to logout ', error);
    }
  }
  return (
    <Auth>
      <h1>Admin Layout</h1>
      <div>Sidebar</div>
      <p>Profile : {JSON.stringify(profile)}</p>
      <button onClick={handleLogoutClick}>Logout</button>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>

      <div>{children}</div>
    </Auth>
  );
}
