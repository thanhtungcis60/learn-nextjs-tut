import { workApi } from '@/api-client';
import { QueryKeys } from '@/constants';
import { ListParams } from '@/models';
import useSWR, { SWRConfiguration } from 'swr';

export interface UseWorkListProps {
  params: Partial<ListParams>;
  options?: SWRConfiguration;
  enable?: boolean;
}
export function useWorkList({ params, options, enable = true }: UseWorkListProps) {
  const swrResponse = useSWR(
    enable
      ? [
          QueryKeys.GET_WORK_LIST, //tên định danh unique cho cái api này
          params, //khi params thay đổi thì gọi lại api
        ]
      : null, //Nếu enable = false thì không gọi api
    () => workApi.getAll(params),
    {
      dedupingInterval: 30 * 1000, //Có những request giống nhau trong 30s thì chỉ gọi 1 lần
      keepPreviousData: true, //giữ data cũ khi params thay đổi
      fallbackData: {
        data: [],
        pagination: {
          _page: 1,
          _limit: 10,
          _totalRows: 0,
        },
      }, //giá trị mặc định ban đầu
      ...options,
    },
  );
  return swrResponse;
}
