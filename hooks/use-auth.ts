import { authApi } from '@/api-client';
import { StorageKeys } from '@/constants';
import { LoginPayload, UserProfile } from '@/models';
import { useEffect } from 'react';
import useSWR, { SWRConfiguration } from 'swr';

function getUserInfo(): UserProfile | null {
  try {
    const data = localStorage.getItem(StorageKeys.USER_INFO);
    if (!data) return null;
    return JSON.parse(data) as UserProfile;
  } catch (error) {
    // console.log('fail to parse user info from local storage', error);
    return null;
  }
}
export function useAuth(options?: Partial<SWRConfiguration>) {
  const {
    data: profile,
    error,
    mutate,
  } = useSWR('/profile', {
    dedupingInterval: 60 * 60 * 1000, //tự động revalidate trong 1h
    revalidateOnFocus: false, //qua tab khac ko can revalidate
    ...options,
    fallbackData: typeof window !== 'undefined' ? getUserInfo() : undefined,
    onSuccess(data, key, config) {
      //save user info to local storage
      localStorage.setItem(StorageKeys.USER_INFO, JSON.stringify(data));
    },
    onError(err, key, config) {
      //failed to get profile
      console.log('useAuth onError', err);
      // Try to infer HTTP status from different error shapes and only logout on 401
      const status = (err && (err.status || err.statusCode)) || (err && err.response && err.response.status);
      if (status === 401 || (typeof err === 'string' && err.toLowerCase().includes('token'))) {
        logout();
      }
    },
  });

  // useEffect(() => {
  //   const localUser = getUserInfo();
  //   if (localUser && !profile) {
  //     mutate(localUser, false); // set data nhưng không trigger revalidate
  //   }
  // }, []);

  // console.log({ profile, error });

  const firstLoading = profile === undefined && error === undefined;
  async function login(payload: LoginPayload) {
    await authApi.login(payload);
    await mutate(); //goi lai api /profile
  }
  async function logout() {
    await authApi.logout();
    mutate(null, false); // xóa profile (set về null), không gọi lại api /profile
    localStorage.removeItem(StorageKeys.USER_INFO);
  }

  return {
    profile,
    error,
    login,
    logout,
    firstLoading,
    isLoggedIn: Boolean(profile),
  };
}
