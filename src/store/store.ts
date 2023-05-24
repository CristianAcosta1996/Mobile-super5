import { configureStore } from "@reduxjs/toolkit";
import { super5Api } from "./super5/super5Api";

export const store = configureStore({
  reducer: {
    [super5Api.reducerPath]: super5Api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(super5Api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
