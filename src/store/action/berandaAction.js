// berandaAction.js

export const SET_ALL_TRENDING = "SET_ALL_TRENDING";
export const SET_TRENDING_MOVIE = "SET_TRENDING_MOVIE";
export const SET_TRENDING_TV = "SET_TRENDING_TV";
export const SET_MOVIE = "SET_MOVIE";
export const SET_TIME_WINDOW = "SET_TIME_WINDOW";

// Action creators
export const setAllTrending = (data) => ({
  type: SET_ALL_TRENDING,
  payload: data,
});

export const setTrendingMovie = (data) => ({
  type: SET_TRENDING_MOVIE,
  payload: data,
});

export const setTrendingTv = (data) => ({
  type: SET_TRENDING_TV,
  payload: data,
});

export const setMovie = (movie) => ({
  type: SET_MOVIE,
  payload: movie,
});

export const setTimeWindow = (timeWindow) => ({
  type: SET_TIME_WINDOW,
  payload: timeWindow,
});
