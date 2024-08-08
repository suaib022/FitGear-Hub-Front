import { baseApi } from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getallProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
    getSingleProduct: builder.query({
      query: (productId: string) => ({
        url: `/products/${productId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetallProductsQuery, useGetSingleProductQuery } = productApi;
