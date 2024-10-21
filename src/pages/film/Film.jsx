import axios from "axios";
import { useEffect, useState } from "react";
import FilmView from "./FilmView";

const API_KEY = "9e6e84a1920044396f1c45215c787688";

const Film = () => {
  const [data, setData] = useState([]); // Now Playing movies
  const [movie, setMovie] = useState(null); // Selected random movie
  const [popular, setPopular] = useState([]); // Popular Movies
  const [topRated, setTopRated] = useState([]); // Top Rated Movies
  const [upcoming, setUpcoming] = useState([]); // Upcoming Movies
  const [videoUrl, setVideoUrl] = useState(""); // State to hold video URL

  // Function to fetch "Now Playing" movie data
  const fetchNowPlayingMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`
      );
      setData(response.data.results);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Function to fetch "Popular Movies" data
  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      );
      setPopular(response.data.results);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Function to fetch "Top Rated Movies" data
  const fetchTopRatedMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
      );
      setTopRated(response.data.results);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Function to fetch "Upcoming Movies" data
  const fetchUpcomingMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`
      );
      setUpcoming(response.data.results);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Function to fetch video for a selected movie
  const fetchMovieVideo = async (id) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
      );
      const videoObjek = response.data.results;

      // Filter to get the YouTube trailer or any video URL
      const video = videoObjek.find(
        (vid) => vid.site === "YouTube" && vid.type === "Trailer"
      );

      if (video) {
        setVideoUrl(`https://www.youtube.com/embed/${video.key}`);
      } else {
        setVideoUrl(""); // Reset if no video is found
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchNowPlayingMovies();
    fetchPopularMovies(); // Fetching popular movies
    fetchTopRatedMovies(); // Fetching top rated movies
    fetchUpcomingMovies(); // Fetching upcoming movies
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      // Pick a random movie from the "Now Playing" list
      const randomMovie = data[Math.floor(Math.random() * data.length)];
      setMovie(randomMovie);

      // Fetch video for the selected movie
      fetchMovieVideo(randomMovie.id);
    }
  }, [data]);

  return (
    <FilmView
      movie={movie}
      videoUrl={videoUrl}
      nowPlayingMovies={data}
      popularMovies={popular} // Send popular movies data
      topRatedMovies={topRated} // Send top rated movies data
      upcomingMovies={upcoming} // Send upcoming movies data
    />
  );
};

export default Film;
