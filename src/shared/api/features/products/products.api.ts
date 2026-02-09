import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../..";
import type { ApiProductsResponse, ProductsRequest } from "./types";

const rootUrl = '/products'

export const productsApi = createApi({
    reducerPath: "productsApi",
    tagTypes: ["Products"],
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getProducts: builder.query<ApiProductsResponse, ProductsRequest>({
            query: ({ page = 1, limit = 10, search, sortBy, order }) => {
                const isSearch = search && search.trim().length > 0;
                const url = isSearch ? `${rootUrl}/search` : rootUrl;
                return {
                    url: url,
                    method: "GET",
                    params: {
                        limit,
                        skip: (page - 1) * limit,
                        sortBy,
                        order,
                        ...(search && { q: search }),
                    }
                };
            },
            providesTags: ["Products"],
        }),
    }),
});

export const {
    useGetProductsQuery,
} = productsApi
