import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Player {
  id: number;
  first_name: string;
  height_feet: number | null;
  height_inches: number | null;
  last_name: string;
  position: string;
  weight_pounds: number | null;
}

interface PaginationMeta {
  total_pages: number;
  current_page: number;
  next_page: number|null;
  per_page: number;
  total_count: number;
}

interface GetPlayersParams{
  page: number;
  perPage: number;
}

export interface PlayersResponse {
  data: Player[];
  meta: PaginationMeta;
}


export const playerSlice = createApi({
  reducerPath: "playerSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.balldontlie.io/api/v1",
  }),
  tagTypes: ["Players"],
  endpoints: (builder) => ({
    getPosts: builder.query<PlayersResponse, GetPlayersParams>({
      query: (params) => `/players?page=${params.page}&per_page=${params.perPage}`,
      providesTags: [{ type: "Players", id: "LIST" }],
    }),
  }),
});
export const { useGetPostsQuery } = playerSlice;
