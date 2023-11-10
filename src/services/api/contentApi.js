import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { data } from "autoprefixer";

export const contentApi = createApi({
  reducerPath: "contentApi",
  tagTypes: ["auth"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://contact-app.mmsdev.site/api/v1",
  }),
  endpoints: (builder) => ({
    getContent: builder.query({
      query: (token) => ({
        url: "/contact",
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["auth"],
    }),
    createContent: builder.mutation({
      query: ({ token, content }) => ({
        url: "/contact",
        method: "Post",
        headers: { authorization: `Bearer ${token}` },
        body: content,
      }),
      invalidatesTags: ["auth"],
    }),
    getContactDetail: builder.query({
      query: ({ id, token }) => ({
        url: `/contact/${id}`,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["contact"],
    }),
    editContact: builder.mutation({
      query: ({ token, content, id }) => ({
        url: `/contact/${id}`,
        method: "PUT",
        headers: { authorization: `Bearer ${token}` },
        body: content,
      }),
      invalidatesTags: ["auth",'contact'],
    }),
    deleteContact: builder.mutation({
      query: ({ id, token }) => ({
        url: `/contact/${id}`,
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useGetContentQuery,
  useCreateContentMutation,
  useGetContactDetailQuery,
  useEditContactMutation,
  useDeleteContactMutation,
} = contentApi;
