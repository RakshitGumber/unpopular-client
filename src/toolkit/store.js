import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import postsReducer from "./slices/postSlice";
import followerReducer from "./slices/followerSlice";

const reducers = combineReducers({
  user: userReducer,
  post: postsReducer,
  people: followerReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
