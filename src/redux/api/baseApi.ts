import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fit-gear-hub-back.vercel.app/api",
  }),
  tagTypes: ["base"],
  endpoints: () => ({}),
});
