import { ListParams, ListResponse, LoginPayload, Work } from '@/models';
import axiosClient from './axios-client';

export const workApi = {
  getAll(params: Partial<ListParams>): Promise<ListResponse<Work>> {
    //Partial<ListParams> means params can have 0 or more properties of ListParams
    return axiosClient.get('/products', { params });
  },
  get(id: string): Promise<Work> {
    return axiosClient.get(`/products/${id}`);
  },
};
