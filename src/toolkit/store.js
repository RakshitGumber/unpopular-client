import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import postsReducer from "./slices/postSlice";
import followerReducer from "./slices/followerSlice";
import settingsReducer from "./slices/settingsSlice";

const peoplePersistConfig = {
  key: "people",
  storage: storage,
  whitelist: ["outgoing"],
};

const settingsPersistConfig = {
  key: "settings",
  storage: storage,
};

const userPersistConfig = {
  key: "user",
  storage: storage,
  whitelist: ["userInfo", "userToken"],
};

const reducers = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  post: postsReducer,
  settings: persistReducer(settingsPersistConfig, settingsReducer),
  people: persistReducer(peoplePersistConfig, followerReducer),
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
