import axios from "axios";
import { useEffect } from "react";
import BerandaView from "./BerandaView";
import { useDispatch } from "react-redux";
import {
  setAllTrending,
  setMovie,
  setTimeWindow,
  setTrendingMovie,
  setTrendingTv,
} from "../../store/action/berandaAction";

const Beranda = () => {
  // const [data, setData] = useState([]);
  // const [movietren, setMovietren] = useState([]);
  // const [tvtren, setTvtren] = useState([]);
  // const [movie, setMovie] = useState(null);
  // const [timeWindow, setTimeWindow] = useState("day"); // State for toggle

  const dispatch = useDispatch();
  const fetchTrending = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/all/${timeWindow}?api_key=9e6e84a1920044396f1c45215c787688`
      );
      dispatch(setAllTrending(response.data.results));
    } catch (error) {
      console.error("Error fetching trending data:", error.message);
    }
  };

  const fetchTrendingMovie = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/${timeWindow}?api_key=9e6e84a1920044396f1c45215c787688`
      );
      dispatch(setTrendingMovie(response.data.results));
    } catch (error) {
      console.error("Error fetching trending movies:", error.message);
    }
  };

  const fetchTrendingTv = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/tv/${timeWindow}?api_key=9e6e84a1920044396f1c45215c787688`
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
  }, [timeWindow]);

  useEffect(() => {
    if (data.length > 0) {
      const randomElement = data[Math.floor(Math.random() * data.length)];
      dispatch(setMovie(randomElement));
    }
  }, [data]);

  return (
    <BerandaView
      movie={movie}
      data={data}
      movietren={movietren}
      tvtren={tvtren}
      setTimeWindow={(zahra) => dispatch(setTimeWindow(zahra))}
    />
  );
};

export default Beranda;
