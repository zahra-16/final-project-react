import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@nextui-org/react";

const PersonDetail = () => {
  const { person_id } = useParams();
  const [person, setPerson] = useState(null);

  const API_KEY = "9e6e84a1920044396f1c45215c787688";

  const fetchPersonDetail = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/${person_id}?api_key=${API_KEY}&append_to_response=movie_credits`
      );
      setPerson(response.data);
    } catch (error) {
      console.error("Error fetching person details:", error.message);
    }
  };

  useEffect(() => {
    fetchPersonDetail();
  }, [person_id]);

  if (!person) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-white p-6">
      <div className="max-w-8xl mx-auto bg-black border-2 border-r p-6 rounded-lg shadow-lg">
        <div className="flex items-start space-x-6">
          <img
            src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
            alt={person.name}
            className="w-48 h-48 rounded-lg object-cover"
          />
          <div>
            <h1 className="text-4xl font-bold mb-2">{person.name}</h1>
            <p className="text-lg text-gray-300 mb-4">{person.biography}</p>
            <p className="text-sm text-gray-400">
              <strong>Birthday:</strong> {person.birthday || "Unknown"}
            </p>
            {person.deathday && (
              <p className="text-sm text-gray-400">
                <strong>Passed:</strong> {person.deathday || "N/A"}
              </p>
            )}
            <p className="text-sm text-gray-400">
              <strong>Place of Birth:</strong> {person.place_of_birth || "N/A"}
            </p>
          </div>
        </div>

        {/* Movies Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Movies</h2>
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
            {person.movie_credits.cast.slice(0, 8).map((movie) => (
              <div
                key={movie.id}
                className="relative min-w-[200px] transform hover:scale-105 transition ease-in-out duration-300 group"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  className="rounded-lg shadow-lg"
                  alt={movie.title}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition ease-in-out duration-300 rounded-lg">
                  <div className="absolute inset-0 bg-black bg-opacity-50 blur-sm group-hover:blur-none transition ease-in-out duration-500 rounded-lg"></div>
                  <div className="relative min-w-[200px] transform hover:scale-105 transition ease-in-out duration-300 group">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      className="rounded-lg shadow-lg"
                      alt={movie.title}
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-75 text-white text-lg p-4 rounded-b-lg transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-in-out w-full border-t border-white shadow-lg space-y-3">
                      <Link
                        to={`/moviedetail/${movie.id}`}
                        className="flex flex-col items-center justify-center"
                      >
                        <h6 className="text-sm font-bold mb-2 group-hover:text-white text-center">
                          {movie.title}
                        </h6>
                        <div className="flex items-center justify-center space-x-2">
                          <span className="bg-white text-black py-1 px-2 rounded-full text-sm font-bold">
                            {movie.vote_average}
                          </span>
                          <Button className="flex items-center space-x-2 text-white bg-black hover:bg-gray-800 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition duration-300">
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
        </div>
      </div>
    </div>
  );
};

export default PersonDetail;
