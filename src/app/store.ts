import { configureStore, Store } from "@reduxjs/toolkit";
import { currencyApi } from "../services/currencyApi";
import exchangesReducer from "../features/exchangeSlice"
import reverseExchangeReducer from "../features/reverseExchangeSlice";

export const store = configureStore({
  reducer: {
    [currencyApi.reducerPath]: currencyApi.reducer,
    exchanges : exchangesReducer,
    reverseExchanges : reverseExchangeReducer
},
middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(currencyApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
