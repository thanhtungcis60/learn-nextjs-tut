import { tagApi } from '@/api-client';
import { QueryKeys } from '@/constants';
import { ListParams } from '@/models';
import useSWR, { SWRConfiguration } from 'swr';

export interface UseTagListProps {
  params?: Partial<ListParams>;
  options?: SWRConfiguration;
}
export function useTagList({ params = { _page: 1, _limit: 30 }, options }: UseTagListProps) {
  const swrResponse = useSWR(
    [
      QueryKeys.GET_TAG_LIST, //tên định danh unique cho cái api này
      params, //khi params thay đổi thì gọi lại api
    ],
    () => tagApi.getAll(params),
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
