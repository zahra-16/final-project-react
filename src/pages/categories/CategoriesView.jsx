import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CategoriesView({ genre, genretv }) {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedGenretv, setSelectedGenretv] = useState(null);
  const [movies, setMovies] = useState([]);
  const [moviestv, setMoviestv] = useState([]);
  const [isMovieSelected, setIsMovieSelected] = useState(true);

  const API_KEY = "9e6e84a1920044396f1c45215c787688";

  const fetchMoviesByGenre = async (genreId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const fetchMoviesByGenretv = async (genreId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=${genreId}`
      );
      const data = await response.json();
      setMoviestv(data.results);
    } catch (error) {
      console.error("Error fetching TV shows:", error);
    }
  };

  const handleGenreClick = (genreId) => {
    if (isMovieSelected) {
      setSelectedGenre(genreId);
      fetchMoviesByGenre(genreId);
    } else {
      setSelectedGenretv(genreId);
      fetchMoviesByGenretv(genreId);
    }
  };

  const toggleCategory = () => {
    setIsMovieSelected(!isMovieSelected);
    setSelectedGenre(null);
    setSelectedGenretv(null);
    setMovies([]);
    setMoviestv([]);
  };

  try {
    return (
      <div className="flex flex-col items-center bg-gradient-to-b from-white via-white to-white dark:bg-gradient-to-b dark:from-black dark:via-black dark:to-black pb-12 min-h-screen">
        <h1 className="text-xl p-4 bg-white text-black dark:text-white font-mono dark:bg-black min-w-full text-center ">
          * Please select the genre you want to watch!!
        </h1>

        {/* Toggle Button */}
        <div className="flex gap-4  min-w-full justify-center bg-white text-black dark:text-white font-bold dark:bg-black">
          <Button
            className={`py-2 px-4 rounded-lg ${
              isMovieSelected
                ? "bg-gray-400 text-black"
                : "bg-gray-600 text-white"
            }`}
            onClick={toggleCategory}
          >
            TV Shows
          </Button>
          <Button
            className={`py-2 px-4 rounded-lg ${
              !isMovieSelected
                ? "bg-gray-400 text-black"
                : "bg-gray-600 text-white"
            }`}
            onClick={toggleCategory}
          >
            Movies
          </Button>
        </div>

        {/* Genre Section */}
        <div className="flex flex-wrap justify-center gap-6 p-8 bg-white text-black dark:text-white font-bold dark:bg-black rounded-lg shadow-md">
          <h2 className="text-xl mb-4 font-normal text-black dark:text-white ">
            {isMovieSelected ? "Movie Genres" : "TV Show Genres"}
          </h2>

          {(isMovieSelected ? genre : genretv).map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                className="bg-gray-400 border-2 border-black text-black py-3 px-6 rounded-lg shadow-lg hover:bg-gray-800 hover:text-white hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
                onClick={() => handleGenreClick(item.id)}
                auto
              >
                {item.name}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Movies Section */}
        {isMovieSelected && selectedGenre && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-black text-3xl mb-9 mt-4 dark:text-white flex justify-center">
              Movies in {genre.find((g) => g.id === selectedGenre).name} genre
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.map((movie) => (
                <motion.div
                  key={movie.id}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to={`/detail/${movie.id}`}>
                    <Card
                      isFooterBlurred
                      radius="lg"
                      className="border-none relative"
                    >
                      <Image
                        alt={movie.title}
                        className="object-cover"
                        height={300}
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        width="100%"
                      />
                      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                        <p className="text-tiny text-white/80">{movie.title}</p>
                        <Button
                          className="text-tiny text-white bg-black/20"
                          variant="flat"
                          color="default"
                          radius="lg"
                          size="sm"
                        >
                          ⭐ {movie.vote_average}/10
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TV Shows Section */}
        {!isMovieSelected && selectedGenretv && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-white text-2xl mb-4">
              TV Shows in {genretv.find((g) => g.id === selectedGenretv).name}{" "}
              genre
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {moviestv.map((tvShow) => (
                <motion.div
                  key={tvShow.id}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to={`/tvdetail/${tvShow.id}`}>
                    <Card
                      isFooterBlurred
                      radius="lg"
                      className="border-none relative"
                    >
                      <Image
                        alt={tvShow.name}
                        className="object-cover"
                        height={300}
                        src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                        width="100%"
                      />
                      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                        <p className="text-tiny text-white/80">{tvShow.name}</p>
                        <Button
                          className="text-tiny text-white bg-black/20"
                          variant="flat"
                          color="default"
                          radius="lg"
                          size="sm"
                        >
                          ⭐ {tvShow.vote_average}/10
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    );
  } catch (error) {
    console.log(error);
  }
}
