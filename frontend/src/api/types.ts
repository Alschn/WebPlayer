import {AxiosResponse} from "axios";

export type Response<T> = AxiosResponse<T>;

export type PaginatedResponseData<T> = {
  count: number;
  previous: string | null,
  next: string | null,
  results: T[]
}

export type PaginatedResponse<T> = Response<PaginatedResponseData<T>>
