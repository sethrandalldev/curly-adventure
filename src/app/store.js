import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user";
import notebooksReducer from "../features/notebooks";

const saveToSessionStorage = (state) => {
  console.log("save)");
  try {
    sessionStorage.setItem("state", JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
};

const loadFromSessionStorage = () => {
  console.log("load");
  try {
    const stateStr = sessionStorage.getItem("state");
    console.log(JSON.parse(stateStr));
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
  },
  preloadedState: persistedStore,
});

store.subscribe(() => {
  console.log("subscribe");
  saveToSessionStorage(store.getState());
});

export default store;
