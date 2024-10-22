import { useEffect, useState } from "react";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";

export const RatedMovie = () => {
  const [ratedMovies, setRatedMovies] = useState([]);
  const [ratedShows, setRatedShows] = useState([]); // State for rated TV shows

  // Fetch rated movies and shows from localStorage when component mounts
  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem("ratedMovies")) || [];
    const shows = JSON.parse(localStorage.getItem("ratedShows")) || []; // Fetch rated shows
    setRatedMovies(movies);
    setRatedShows(shows); // Set rated shows
  }, []);

  // Function to remove a movie rating
  const removeMovieRating = (id) => {
    const updatedMovies = ratedMovies.filter((movie) => movie.id !== id);
    setRatedMovies(updatedMovies);
    localStorage.setItem("ratedMovies", JSON.stringify(updatedMovies));
  };

  // Function to remove a show rating
  const removeShowRating = (id) => {
    const updatedShows = ratedShows.filter((show) => show.id !== id);
    setRatedShows(updatedShows);
    localStorage.setItem("ratedShows", JSON.stringify(updatedShows));
  };

  // Conditional rendering based on ratings
  if (!ratedMovies.length && !ratedShows.length) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-black">
        <h2 className="text-xl font-bold text-white">No Rated Movies or Shows Yet</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white  py-8 dark:bg-black ">
      <h1 className="text-4xl font-bold text-center text-black dark:text-white mb-12 pt-9">
        Your Rated Movies and Shows
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-9 px-20 py-24">
        {/* Render rated movies */}
        {ratedMovies.map((movie) => (
          <Card
            key={movie.id}
            isFooterBlurred
            radius="lg"
            className="border-none bg-gradient-to-br from-gray-800 to-black shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 max-w-xs mx-auto"
          >
            <Image
              alt={movie.title}
              className="object-cover rounded-t-lg"
              height={380}
              width={250}
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-b-lg bottom-1 w-full shadow-small ml-1 z-10">
              <p className="text-tiny text-white/80">You rated: {movie.userRating} stars</p>
              <Button
                className="text-tiny text-white bg-red-500 hover:bg-red-600 transition duration-300"
                variant="flat"
                color="default"
                radius="lg"
                size="sm"
                onClick={() => removeMovieRating(movie.id)}
              >
                Remove Rating
              </Button>
            </CardFooter>
          </Card>
        ))}

        {/* Render rated shows */}
        {ratedShows.map((show) => (
          <Card
            key={show.id}
            isFooterBlurred
            radius="lg"
            className="border-none bg-gradient-to-br from-gray-800 to-black shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 max-w-xs mx-auto"
          >
            <Image
              alt={show.name}
              className="object-cover rounded-t-lg"
              height={380}
              width={250}
              src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
            />  
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-b-lg bottom-1 w-full shadow-small ml-1 z-10">
              <p className="text-tiny text-white/80">You rated: {show.userRating} stars</p>
              <Button
                className="text-tiny text-white bg-red-500 hover:bg-red-600 transition duration-300"
                variant="flat"
                color="default"
                radius="lg"
                size="sm"
                onClick={() => removeShowRating(show.id)}
              >
                Remove Rating
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
