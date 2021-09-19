import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user";
import notebooksReducer from "../features/notebooks";
import pagesReducer from "../features/pages";

const saveToSessionStorage = (state: RootState) => {
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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
