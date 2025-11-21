import { workApi } from '@/api-client';
import { QueryKeys } from '@/constants';
import useSWR, { SWRConfiguration } from 'swr';

export interface UseWorkDetailsProps {
  workId: string;
  options?: SWRConfiguration;
  enable?: boolean;
}
export function useWorkDetails({ workId, options, enable = true }: UseWorkDetailsProps) {
  const swrResponse = useSWR(
    enable
      ? [
          QueryKeys.GET_WORK_LIST, //tên định danh unique cho cái api này
          workId, //khi params thay đổi thì gọi lại api
        ]
      : null, //Nếu enable = false thì không gọi api
    () => workApi.get(workId),
    {
      dedupingInterval: 30 * 1000, //Có những request giống nhau trong 30s thì chỉ gọi 1 lần
      keepPreviousData: true, //giữ data cũ khi params thay đổi
      fallbackData: null, //giá trị mặc định ban đầu
      ...options,
    },
  );
  return swrResponse;
}
