import { ListParams, ListResponse } from '@/models';
import axiosClient from './axios-client';

export const tagApi = {
  getAll(params: Partial<ListParams>): Promise<ListResponse<string>> {
    //Partial<ListParams> means params can have 0 or more properties of ListParams
    return axiosClient.get('/tags', { params });
  },
};
