/* eslint-disable @typescript-eslint/no-explicit-any */
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
    createProduct: builder.mutation({
      query: (productData) => ({
        url: "/products",
        method: "POST",
        body: productData,
      }),
    }),
    deleteSingleProduct: builder.mutation({
      query: (productId: string) => ({
        url: "/products/delete",
        method: "DELETE",
        params: { productId },
      }),
    }),
    deleteMultipleProducts: builder.mutation({
      query: (ids: string[]) => ({
        url: "/products/delete",
        method: "DELETE",
        body: { ids },
      }),
    }),
    updateSingleProduct: builder.mutation({
      query: ({ productId, updatedData }) => ({
        url: `/products/${productId}`,
        method: "PUT",
        body: updatedData,
      }),
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
