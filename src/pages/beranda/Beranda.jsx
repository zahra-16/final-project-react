import React, { useEffect, useReducer } from "react";
import axios from "axios";
import BerandaView from "./BerandaView";
import { berandaReducer, initialState } from "../../store/reducer/berandaReducer";
import {
  setAllTrending,
  setMovie,
  setTimeWindow,
  setTrendingMovie,
  setTrendingTv,
} from "../../store/action/berandaAction";

const Beranda = () => {
  const [state, dispatch] = useReducer(berandaReducer, initialState);

  const fetchTrending = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/all/${state.timeWindow}?api_key=9e6e84a1920044396f1c45215c787688`
      );
      dispatch(setAllTrending(response.data.results));
    } catch (error) {
      console.error("Error fetching trending data:", error.message);
    }
  };

  const fetchTrendingMovie = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/${state.timeWindow}?api_key=9e6e84a1920044396f1c45215c787688`
      );
      dispatch(setTrendingMovie(response.data.results));
    } catch (error) {
      console.error("Error fetching trending movies:", error.message);
    }
  };

  const fetchTrendingTv = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/tv/${state.timeWindow}?api_key=9e6e84a1920044396f1c45215c787688`
      );
      dispatch(setTrendingTv(response.data.results));
    } catch (error) {
      console.error("Error fetching trending TV shows:", error.message);
    }
  };

  useEffect(() => {
    fetchTrending();
    fetchTrendingMovie();
    fetchTrendingTv();
  }, [state.timeWindow]);

  useEffect(() => {
    if (state.data.length > 0) {
      const randomElement = state.data[Math.floor(Math.random() * state.data.length)];
      dispatch(setMovie(randomElement));
    }
  }, [state.data]);

  return (
    <BerandaView
      movie={state.movie}
      data={state.data}
      movietren={state.movietren}
      tvtren={state.tvtren}
      setTimeWindow={(zahra) => dispatch(setTimeWindow(zahra))}
    />
  );
};

export default Beranda;
