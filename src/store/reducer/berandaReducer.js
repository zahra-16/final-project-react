// berandaReducer.js

import {
  SET_ALL_TRENDING,
  SET_TRENDING_MOVIE,
  SET_TRENDING_TV,
  SET_MOVIE,
  SET_TIME_WINDOW,
} from "../action/berandaAction";

// Initial state
export const initialState = {
  data: [],
  movietren: [],
  tvtren: [],
  movie: null,
  timeWindow: "day", // Default timeWindow value
};

// Reducer function
export const berandaReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_TRENDING:
      return {
        ...state,
        data: action.payload,
      };

    case SET_TRENDING_MOVIE:
      return {
        ...state,
        movietren: action.payload,
      };

    case SET_TRENDING_TV:
      return {
        ...state,
        tvtren: action.payload,
      };

    case SET_MOVIE:
      return {
        ...state,
        movie: action.payload,
      };

    case SET_TIME_WINDOW:
      return {
        ...state,
        timeWindow: action.payload,
      };

    default:
      return state;
  }
};
