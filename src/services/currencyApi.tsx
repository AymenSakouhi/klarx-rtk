import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Data } from "../models/data.model";

interface Information {
  date: string;
  from: string;
  to: string;
}

export const currencyApi = createApi({
  reducerPath: "currencyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.exchangerate.host/`,
  }),
  endpoints: (builder) => ({
    currency: builder.query<Data, object>({
      query: (info : Information) => `convert?from=${info.from}&to=${info.to}&date=${info.date}`,
    }),
  }),
});

export const { useCurrencyQuery } = currencyApi;
