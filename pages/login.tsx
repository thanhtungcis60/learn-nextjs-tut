import { useAuth } from '@/hooks';

import * as React from 'react';

export default function LoginPage() {
  const { profile, login, logout } = useAuth({ revalidateOnMount: false });
  async function handleLoginClick() {
    try {
      await login();
      console.log('Login redirect to home page');
    } catch (error) {
      console.log('failed to login ', error);
    }
  }

  async function handleLogoutClick() {
    try {
      await logout();
      console.log('Logout redirect to home page');
    } catch (error) {
      console.log('failed to logout ', error);
    }
  }

  return (
    <div>
      <h1>Login Page</h1>
      <p>Profile: {JSON.stringify(profile || {}, null, 4)}</p>
      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
}
