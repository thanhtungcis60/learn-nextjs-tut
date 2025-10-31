import { authApi } from '@/api-client';
import { LoginPayload } from '@/models';
import useSWR from 'swr';
import { PublicConfiguration } from 'swr/_internal';

export function useAuth(options?: Partial<PublicConfiguration>) {
  const {
    data: profile,
    error,
    mutate,
  } = useSWR('/profile', {
    dedupingInterval: 60 * 60 * 1000, //tự động revalidate trong 1h
    revalidateOnFocus: false, //qua tab khac ko can revalidate
    ...options,
  });
  console.log({ profile, error });

  const firstLoading = profile === undefined && error === undefined;
  async function login(payload: LoginPayload) {
    await authApi.login(payload);
    await mutate(); //goi lai api /profile
  }
  async function logout() {
    await authApi.logout();
    mutate({}, false); //xoa profile di, ko can goi lai api /profile
  }

  return {
    profile,
    error,
    login,
    logout,
    firstLoading,
  };
}
