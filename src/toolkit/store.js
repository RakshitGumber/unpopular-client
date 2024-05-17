import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import postsReducer from "./slices/postSlice";
import followerReducer from "./slices/followerSlice";
import messageReducer from "./slices/messageSlice";

const peoplePersistConfig = {
  key: "people",
  storage: storage,
  whitelist: ["outgoing"],
};

const reducers = combineReducers({
  user: userReducer,
  post: postsReducer,
  people: persistReducer(peoplePersistConfig, followerReducer),
  message: messageReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
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
