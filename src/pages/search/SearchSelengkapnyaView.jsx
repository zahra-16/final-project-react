import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

export const SearchSelengkapnyaView = ({ movie }) => {
  try {
    return (
      <section className="bg-white dark:bg-black w-full pb-28 px-8 pt-8">
        <h4 className="text-2xl text-center font-medium mb-8 text-black bg-white dark:bg-black dark:text-white ">
          Movie / Film Yang Tersedia
        </h4>
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
          {movie?.map((film, index) => (
            <div
              key={index}
              className="relative min-w-[200px] transform hover:scale-105 transition ease-in-out duration-300 group"
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
                    {film.media_type == "movie" ? (
                      <Link
                        to={`/moviedetail/${film.id}`}
                        className="flex flex-col items-center justify-center"
                      >
                        <h6 className="text-sm font-bold mb-2 group-hover:text-white text-center">
                          {film.title || film.name}
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
                    ) : (
                      <Link
                        to={`/tvdetail/${film.id}`}
                        className="flex flex-col items-center justify-center"
                      >
                        <h6 className="text-sm font-bold mb-2 group-hover:text-white text-center">
                          {film.title || film.name}
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
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  } catch (error) {
    console.log(error);
  }
};
