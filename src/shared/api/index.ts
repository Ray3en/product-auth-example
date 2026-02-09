import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";

export const api: AxiosInstance = axios.create({
    // Оставил твой BASE_URL, как ты и просил
    baseURL: import.meta.env.API_URL || 'https://dummyjson.com',
});

export const axiosBaseQuery = (): BaseQueryFn<
    {
        url: string;
        method?: AxiosRequestConfig['method'];
        data?: AxiosRequestConfig['data'];
        params?: AxiosRequestConfig['params'];
        headers?: AxiosRequestConfig['headers'];
    },
    unknown, 
    unknown 
> =>
    async ({ url, method = 'GET', data, params, headers }) => {
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');

            const result = await api({
                url,
                method,
                data,
                params,
                headers: {
                    ...headers,
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                }
            });

            return { data: result.data };

        } catch (axiosError) {
            const err = axiosError as AxiosError<any>;
            
            if (err.response?.status === 401) {
                localStorage.clear();
                sessionStorage.clear();
            }

            const errorResponse = err.response?.data || {
                statusCode: err.response?.status || 500,
                message: err.message || 'Unknown Error',
                error: 'Internal Server Error',
            };

            return { error: errorResponse };
        }
    };