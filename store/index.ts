// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import nodeReducer from "./slices/nodeSlice";

export const store = configureStore({
  reducer: {
    node: nodeReducer,
  },
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
