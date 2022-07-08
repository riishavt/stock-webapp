import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { userSlice } from './features/userSlice';
// import { portfolioApi } from './services/portfolioApi';
import { userApi } from './services/userApi';
import { scripSlice } from './features/searchSlice';

export const store = configureStore({
  reducer: {
     scrip: scripSlice.reducer,
    // [portfolioApi.reducerPath]: portfolioApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [userSlice.name]: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
    //   portfolioApi.middleware,
      userApi.middleware,
    )
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
