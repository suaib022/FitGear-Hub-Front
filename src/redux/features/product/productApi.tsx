/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getallProducts: builder.query({
      query: (query) => ({
        url: "/products",
        method: "GET",
        params: query,
      }),
      providesTags: ["base"],
    }),
    getSingleProduct: builder.query({
      query: (productId: string) => ({
        url: `/products/${productId}`,
        method: "GET",
      }),
      providesTags: ["base"],
    }),
    createProduct: builder.mutation({
      query: (productData) => ({
        url: "/products",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["base"],
    }),
    deleteSingleProduct: builder.mutation({
      query: (productId: string) => ({
        url: "/products/delete",
        method: "DELETE",
        params: { productId },
      }),
      invalidatesTags: ["base"],
    }),
    deleteMultipleProducts: builder.mutation({
      query: (ids: string[]) => ({
        url: "/products/delete",
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: ["base"],
    }),
    updateSingleProduct: builder.mutation({
      query: ({
        productId,
        updatedData,
      }: {
        productId: string;
        updatedData: any;
      }) => ({
        url: `/products/${productId}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["base"],
    }),
  }),
});

export const {
  useGetallProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useDeleteSingleProductMutation,
  useUpdateSingleProductMutation,
  useDeleteMultipleProductsMutation,
} = productApi;
