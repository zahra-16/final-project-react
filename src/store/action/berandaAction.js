export const SET_ALL_TRENDING = "SET_ALL_TRENDING";
export const SET_TRENDING_MOVIE = "SET_TRENDING_MOVIE";
export const SET_TRENDING_TV = "SET_TRENDING_TV";
export const SET_TIME_WINDOW = "SET_TIME_WINDOW";
export const SET_FETCH_ERROR = "SET_FETCH_ERROR";
export const SET_MOVIE = "SET_MOVIE";

export const setAllTrending = (AllTrending) => {
  return { type: SET_ALL_TRENDING, payload: AllTrending };
};

export const setTrendingMovie = (TrendingMovie) => {
  return { type: SET_TRENDING_MOVIE, payload: TrendingMovie };
};

export const setTrendingTv = (TrendingTv) => {
  return { type: SET_TRENDING_TV, payload: TrendingTv };
};

export const setTimeWindow = (TimeWindow) => {
  return { type: SET_TIME_WINDOW, payload: TimeWindow };
};

export const setFetchError = (FetchError) => {
  return { type: SET_FETCH_ERROR, payload: FetchError };
};

export const setMovie = (Movie) => {
  return { type: SET_MOVIE, payload: Movie };
};
