import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import appReducer from './slices/AppSlice'
import { videoApi } from "../services/VideoService";

export const store = configureStore({
    reducer: {
        app: appReducer,
        [videoApi.reducerPath]: videoApi.reducer
    },

    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(videoApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch