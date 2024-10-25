import { useEffect, useState } from "react";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import axios from "axios";
import { Link } from "react-router-dom";

export const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const header = {
    headers: {
      Accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTZlODRhMTkyMDA0NDM5NmYxYzQ1MjE1Yzc4NzY4OCIsIm5iZiI6MTcyOTgxMTc1NS43MDUwNzQsInN1YiI6IjY3MDQ4NzgzMzIyZDNlYTgzMTFkMzA2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ew3IvZ3YLXZFKeuGMv_Y4SvcwdQD_N7j8tTUXEIRvY0",
    },
  };

  const ambilFavorit = async () => {
    const url = "https://api.themoviedb.org/3/account/null/favorite/movies";
    try {
      const response = await axios.get(url, header);
      console.log(response.data);
      setFavorites(response.data.results);
    } catch (error) {
      console.log("Error fetching rating:", error.message);
    }
  };

  useEffect(() => {
    ambilFavorit();
  }, []);

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-black">
        <h2 className="text-xl font-bold text-white">No Favorites Added Yet</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 dark:bg-black">
      <h1 className="text-4xl font-bold text-center text-black dark:text-white mb-12">
        Your Favorite Movies
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-9 px-20 py-24">
        {favorites.map((movie) => (
          <Card
            key={movie.id}
            isFooterBlurred
            radius="lg"
            className="border-none bg-gradient-to-br from-gray-800 to-black shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 max-w-xs mx-auto" // Set max width and center the card
          >
            <Image
              alt={movie.title}
              className="object-cover rounded-t-lg" // Added rounding to the top of the image
              height={380} // Set the image height
              width={250} // Set the image width
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-b-lg bottom-1 w-full shadow-small ml-1 z-10">
              <p className="text-tiny text-white/80">
                {new Date(movie.release_date).toDateString()}
              </p>
              <Link to={`/detail/${movie.id}`}>
                <Button
                  className="text-tiny text-white bg-red-500 hover:bg-red-600 transition duration-300"
                  variant="flat"
                  color="default"
                  radius="lg"
                  size="sm"
                  // onClick={() => removeFromFavorites(movie.id)}
                >
                  Remove from Favorites
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
