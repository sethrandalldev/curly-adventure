import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user";
import notebooksReducer from "../features/notebooks";
import pagesReducer from "../features/pages";

const saveToSessionStorage = (state) => {
  try {
    sessionStorage.setItem("state", JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
};

const loadFromSessionStorage = () => {
  try {
    const stateStr = sessionStorage.getItem("state");
    return stateStr ? JSON.parse(stateStr) : undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const persistedStore = loadFromSessionStorage();

const store = configureStore({
  reducer: {
    user: userReducer,
    notebooks: notebooksReducer,
    pages: pagesReducer,
  },
  preloadedState: persistedStore,
});

store.subscribe(() => {
  saveToSessionStorage(store.getState());
});

export default store;
