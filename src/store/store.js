import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./reducer/themeReducer";
import { berandaReducer } from "./reducer/berandaReducer";


const store = configureStore({
  reducer: {
    theme: themeReducer,
    berandaReducer: berandaReducer,
  },
});

export default store;
