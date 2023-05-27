"use client"

import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import { createWrapper } from "@/next-redux-wrapper";
import { authSlice } from "@/slices/authSlice";
import { playerSlice } from "@/slices/playerSlice";
import { teamSlice } from "@/slices/teamSlice";
import { tabSlice } from "@/slices/tabSlice";
import {teamPlayerSlice} from "@/slices/teamPlayerSlice";
import { persistStore, persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";


const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [teamSlice.name]: teamSlice.reducer,
  [teamPlayerSlice.name]: teamPlayerSlice.reducer,
  [tabSlice.name]: tabSlice.reducer,
  [playerSlice.reducerPath]: playerSlice.reducer,
});

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        playerSlice.middleware
      ),
    devTools: true,
  });

const makeStore = () => {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return makeConfiguredStore();
  } else {
    // we need it only on client side
    const persistConfig = {
      key: "nextjs",
      whitelist: ["auth", "teams", "tab", "team-player"], // make sure it does not clash with server keys
      storage,
    };
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    let store: any = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(
          playerSlice.middleware
        ),
      devTools: process.env.NODE_ENV !== "production",
    });
    store.__persistor = persistStore(store); // Nasty hack
    return store;
  }
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
