import { Button } from "@nextui-org/react";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function BerandaView({
  data,
  movie,
  setTimeWindow, // Prop function from parent
  movietren,
  tvtren,
}) {
  const [timeWindow, setTimeWindowState] = useState("day"); // State for local time window

  // Effect to retrieve time window from local storage on mount
  useEffect(() => {
    const storedTimeWindow = localStorage.getItem("timeWindow");
    if (storedTimeWindow && storedTimeWindow !== timeWindow) {
      setTimeWindowState(storedTimeWindow);
      setTimeWindow(storedTimeWindow); // Call the parent function to update the trending movies
    }
  }, []); // Empty dependency array to run only on mount

  const handleToggle = (time) => {
    if (time !== timeWindow) {
      setTimeWindowState(time); // Update local state
      setTimeWindow(time); // Call the parent function to update trending movies
      localStorage.setItem("timeWindow", time); // Store the time window in local storage
    }
  };

  try {
    return (
      <div className="text-white font-sans min-h-screen">
        {/* Hero Section */}
        <section
          className="relative bg-cover bg-center py-32 px-8 text-center h-[900px] flex-col"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
          }}
        >
          <div className="bg-gradient-to-b from-transparent to-white absolute inset-0 z-0 dark:bg-gradient-to-b dark:from-transparen dark:to-black dark:absolute dark:inset-0 dark:z-0 "></div>
          <h1 className="text-4xl font-bold mb-4 text-start text-black dark:text-white ">
            Unlimited movies, TV shows, and more.
          </h1>
          <p className="text-xl mb-8 text-start text-black dark:text-white ">
            Watch anywhere, anytime.
          </p>
          <div className="pb-32">
            <Link to="/film">
              <Button className="bg-white border border-black text-black hover:bg-slate-900 hover:text-white dark:bg-black dark:border dark:border-white dark:text-white py-3 px-8 rounded-full text-lg dark:hover:bg-slate-400 dark:hover:text-black dark:transition-colors duration-300 ease-in-out flex items-center justify-center shadow-md">
                Start Watching
              </Button>
            </Link>
          </div>

          {/* Movie details and overview */}
          <div className="rounded-md p-9 pt-3 relative bg-white dark:bg-black dark:bg-opacity-30  bg-opacity-30 hover:bg-opacity-50 transition ease-in-out duration-300">
            <h1 className="flex justify-center text-3xl font-bold pt-7 underline underline-offset-8 text-black dark:text-white">
              {movie?.title || movie?.name} {/* Use title or name */}
            </h1>
            <div className="bg-white dark:bg-black opacity-70 w-200px"></div>
            <div className="card w-[200px] rounded-md pt-24 pb-4">
              <figure>
                <div className="flex flex-col ">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    className="w-full"
                    alt={movie.title || movie.name} // Use title or name
                  />
                </div>
              </figure>
            </div>
            <div className="relative bottom-80">
              <p className="text-start ml-48 text-lg p-10 text-black dark:text-white">
                {movie.overview}
              </p>
              <div className="">
                <div className="flex justify-center space-x-4 mt-4">
                  <Link to={`/detail/${movie.id}`}>
                    <Button className="bg-gray-300 hover:bg-black text-black hover:text-white dark:bg-slate-400 dark:hover:bg-slate-700 dark:text-black py-2 px-4 w-auto rounded-md ms-2 flex items-center justify-center space-x-2">
                      <span>See More</span>
                      <Play />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-x-clip">
          <div className="bg-white dark:bg-black w-[-98px] h-48"></div>
        </section>

        {/* All Trending Popular Shows Section */}
        <section className="bg-white py-2 dark:bg-black">
          <h1 className="text-7xl font-bold mb-8 flex justify-center text-black relative pb-28 dark:text-white">
            All Trending Movies
          </h1>

          <section>
            {/* Trending Toggle Section */}
            <div className="flex justify-center mt-4 ">
              <button
                className={`py-2 px-4 mr-2 rounded ${
                  timeWindow === "day" ? "bg-gray-700" : "bg-gray-500"
                }`}
                onClick={() => handleToggle("day")}
              >
                Trending Today
              </button>
              <button
                className={`py-2 px-4 rounded ${
                  timeWindow === "week" ? "bg-gray-700" : "bg-gray-500"
                }`}
                onClick={() => handleToggle("week")}
              >
                Trending This Week
              </button>
            </div>
          </section>
        </section>

        <section className="bg-white dark:bg-black bg-cover w-full pb-28 px-3">
          <h4 className="text-3xl font-bold mb-8 text-black bg-white dark:text-white dark:bg-black ml-3">
            All Trending
          </h4>
          <div className="flex space-x-5 overflow-x-auto scrollbar-hide">
            {data?.map((film, index) => (
              <div
                key={index}
                className="relative min-w-[200px] border-4 border-black rounded-lg dark:border-2 dark:border-white dark:rounded-lg transform hover:scale-105 transition ease-in-out duration-300 group"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                  className="rounded-lg shadow-lg"
                  alt={film.title || film.name} // Use title or name
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition ease-in-out duration-300 rounded-lg">
                  <div className="absolute inset-0 bg-black bg-opacity-50 blur-sm group-hover:blur-none transition ease-in-out duration-500 rounded-lg"></div>
                  <div className="relative min-w-[200px] transform hover:scale-105 transition ease-in-out duration-300 group">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                      className="rounded-lg shadow-lg"
                      alt={film.title || film.name} // Use title or name
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-75 text-white text-lg p-4 rounded-b-lg transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-in-out w-full border-t border-white shadow-lg space-y-3">
                      <Link
                        to={`/detail/${film.id}`}
                        className="flex flex-col items-center justify-center"
                      >
                        <h6 className="text-sm font-bold mb-2 group-hover:text-white text-center">
                          {film.title || film.name} {/* Use title or name */}
                        </h6>
                        <div className="flex items-center justify-center space-x-2 pt-4-">
                          <span className="bg-white text-black py-1 px-2 rounded-full text-sm font-bold">
                            {film.vote_average}
                          </span>
                          <Button className="flex items-center space-x-2 text-white bg-black hover:bg-gray-800 px-4 py-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                            <span className="font-sm">Watch Now</span>
                          </Button>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-black w-full pb-28 px-8">
          <h4 className="text-3xl font-bold mb-8 text-black bg-white dark:bg-black dark:text-white ">
            Movie Trending
          </h4>
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
            {movietren?.map((film, index) => (
              <div
                key={index}
                className="relative min-w-[200px] border-4 border-black rounded-lg dark:border-2 dark:border-white dark:rounded-lg transform hover:scale-105 transition ease-in-out duration-300 group"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                  className="rounded-lg shadow-lg"
                  alt={film.title || film.name} // Use title or name
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition ease-in-out duration-300 rounded-lg">
                  <div className="absolute inset-0 bg-black bg-opacity-50 blur-sm group-hover:blur-none transition ease-in-out duration-500 rounded-lg"></div>
                  <div className="relative min-w-[200px] transform hover:scale-105 transition ease-in-out duration-300 group">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                      className="rounded-lg shadow-lg"
                      alt={film.title || film.name} // Use title or name
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-75 text-white text-lg p-4 rounded-b-lg transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-in-out w-full border-t border-white shadow-lg space-y-3">
                      <Link
                        to={`/detail/${film.id}`}
                        className="flex flex-col items-center justify-center"
                      >
                        <h6 className="text-sm font-bold mb-2 group-hover:text-white text-center">
                          {film.title || film.name} {/* Use title or name */}
                        </h6>
                        <div className="flex items-center justify-center space-x-2 pt-4-">
                          <span className="bg-white text-black py-1 px-2 rounded-full text-sm font-bold">
                            {film.vote_average}
                          </span>
                          <Button className="flex items-center space-x-2 text-white bg-black hover:bg-gray-800 px-4 py-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                            <span className="font-sm">Watch Now</span>
                          </Button>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-black w-full pb-28 px-8">
          <h4 className="text-3xl font-bold mb-8 text-black bg-white dark:bg-black dark:text-white ">
            Tv Trending
          </h4>
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
            {tvtren?.map((film, index) => (
              <div
                key={index}
                className="relative min-w-[200px] border-4 border-black rounded-lg dark:border-2 dark:border-white dark:rounded-lg transform hover:scale-105 transition ease-in-out duration-300 group"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                  className="rounded-lg shadow-lg"
                  alt={film.title || film.name} // Use title or name
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition ease-in-out duration-300 rounded-lg">
                  <div className="absolute inset-0 bg-black bg-opacity-50 blur-sm group-hover:blur-none transition ease-in-out duration-500 rounded-lg"></div>
                  <div className="relative min-w-[200px] transform hover:scale-105 transition ease-in-out duration-300 group">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                      className="rounded-lg shadow-lg"
                      alt={film.name} // Use name directly for TV shows
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-75 text-white text-lg p-4 rounded-b-lg transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-in-out w-full border-t border-white shadow-lg space-y-3">
                      <Link
                        to={`/tvdetail/${film.id}`}
                        className="flex flex-col items-center justify-center"
                      >
                        <h6 className="text-sm font-bold mb-2 group-hover:text-white text-center">
                          {film.name} {/* Use name directly for TV shows */}
                        </h6>
                        <div className="flex items-center justify-center space-x-2">
                          <span className="bg-white text-black py-1 px-2 rounded-full text-sm font-bold">
                            {film.vote_average}
                          </span>
                          <Button className="flex items-center space-x-2 text-white bg-black hover:bg-gray-800 px-4 py-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                            <span className="font-sm">Watch Now</span>
                          </Button>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.log(error);
  }
}
