import { useAuth } from '@/hooks';
import { encodeUrl } from '@/utils/url';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export interface AuthProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  requireLogin?: boolean;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Auth({ children, requireLogin }: AuthProps) {
  const router = useRouter();
  const { profile, firstLoading } = useAuth();

  useEffect(() => {
    if (!requireLogin) return;
    if (!firstLoading && !profile?.username) router.replace(`/login?back_to=${encodeUrl(router.asPath)}`);
  }, [router, profile, firstLoading, requireLogin]);

  if (requireLogin && !profile?.username) return <p>Loading...</p>;
  return <div>{children}</div>;
}
