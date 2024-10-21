import {
  SET_ALL_TRENDING,
  SET_FETCH_ERROR,
  SET_MOVIE,
  SET_TIME_WINDOW,
  SET_TRENDING_MOVIE,
  SET_TRENDING_TV,
} from "../action/berandaAction";

const initialState = {
  trending: [],
  movietren: [],
  tvtren: [],
  movie: {},
  timeWindow: "day",
  error: null,
};

const berandaReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_TRENDING:
      return { ...state, trending: action.payload };
    case SET_TRENDING_MOVIE:
      return { ...state, movietren: action.payload };
    case SET_TRENDING_TV:
      return { ...state, tvtren: action.payload };
    case SET_TIME_WINDOW:
      return { ...state, timeWindow: action.payload };
    case SET_FETCH_ERROR:
      return { ...state, error: action.payload };
    case SET_MOVIE:
      return { ...state, movie: action.payload };
    default:
      return state;
  }
};

export default berandaReducer;
