// src/modules/auth/api/auth.api.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../model/auth.slice";
import { axiosBaseQuery } from "../../../shared/api";
import type { AuthResponse, LoginRequest } from "../model/types";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: ({username, password}) => ({
                url: '/auth/login',
                method: 'POST',
                data: {
                    username,
                    password,
                },
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCredentials({
                        user: data,
                        token: data.accessToken,
                        remember: args.remember
                    }));
                } catch (error) {
                    console.error("Login Error:", error);
                }
            },
        }),
        getMe: builder.query<AuthResponse, void>({
            query: () => ({
                url: '/auth/me',
                method: 'GET',
            }),
        }),
    }),
});

export const { useLoginMutation, useGetMeQuery } = authApi;