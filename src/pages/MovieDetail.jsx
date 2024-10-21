import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const MovieDetail = () => {
  const [detail, setDetail] = useState();
  const [video, setVideo] = useState();
  const [isModalOpen, toggleModal] = useState(false);
  const [reviews, setReviews] = useState();
  const [userRating, setUserRating] = useState(null); // Track user's rating
  const [alertMessage, setAlertMessage] = useState(""); // State for alert message
  const { id } = useParams();
  const API_KEY = "9e6e84a1920044396f1c45215c787688"; // API Key

  // Fetch movie details
  const fetchDetail = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
      );
      setDetail(response.data);
    } catch (error) {
      console.error("Error fetching movie details:", error.message);
    }
  };

  // Fetch movie videos
  const fetchVideo = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
      );
      setVideo(response.data);
    } catch (error) {
      console.error("Error fetching movie videos:", error.message);
    }
  };

  // Fetch movie reviews
  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}`
      );
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error.message);
    }
  };

  useEffect(() => {
    fetchDetail();
    fetchVideo();
    fetchReviews();
  }, [id]);

  const addToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isAlreadyFavorite = favorites.some((fav) => fav.id === detail.id);
    if (!isAlreadyFavorite) {
      favorites.push(detail);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setAlertMessage(`${detail.title} has been added to your Favorites.`);
    } else {
      setAlertMessage(`${detail.title} is already in your Favorites.`);
    }
  };

  // Handle rating functionality
  const handleRating = (rating) => {
    setUserRating(rating);
    let ratedMovies = JSON.parse(localStorage.getItem("ratedMovies")) || [];
    const movieExists = ratedMovies.some((movie) => movie.id === detail.id);

    if (!movieExists) {
      ratedMovies.push({ ...detail, userRating: rating });
    } else {
      ratedMovies = ratedMovies.map((movie) =>
        movie.id === detail.id ? { ...movie, userRating: rating } : movie
      );
    }

    localStorage.setItem("ratedMovies", JSON.stringify(ratedMovies));
    setAlertMessage(`${detail.title} has been rated ${rating} stars.`);
  };

  if (!detail) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      {alertMessage && (
        <div role="alert" className="alert">
          <span>{alertMessage}</span>
          <button className="btn btn-sm" onClick={() => setAlertMessage("")}>
            Close
          </button>
        </div>
      )}

      <section className="relative flex-col flex items-center justify-center min-h-screen">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={`https://image.tmdb.org/t/p/w1280/${detail?.backdrop_path}`}
            alt="Backdrop"
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto p-6 space-y-8 lg:space-y-0 lg:space-x-12">
          {/* Left Column (Text) */}
          <div className="text-white lg:w-1/2">
            <h1 className="text-6xl font-bold mb-4">{detail?.title}</h1>
            <p className="text-lg mb-6">
              Coming Soon • {new Date(detail?.release_date).toDateString()}
            </p>

            <div className="my-6">
              <p className="text-xl mb-2">Rate this movie:</p>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(star)}
                    className={`text-2xl ${
                      userRating >= star ? "text-yellow-400" : "text-gray-400"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
              {userRating && (
                <p className="mt-2">You rated this movie {userRating} stars</p>
              )}
            </div>

            <div className="flex space-x-4 mb-6">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg"
                onClick={() => {
                  document.getElementById("my_modal_1").showModal();
                  toggleModal(true);
                }}
              >
                Watch Trailer
              </button>

              <dialog id="my_modal_1" className="modal">
                <div className="modal-box w-full text-black overflow-x-hidden">
                  {/* Check if the modal is open, then load the video */}
                  {isModalOpen && (
                    <iframe
                      width="465"
                      height="315"
                      title="YouTube video player"
                      src={`https://www.youtube.com/embed/${video?.results[0]?.key}`}
                      allow="accelerometer; autoplay; fullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  )}

                  <div className="modal-action">
                    <form method="dialog">
                      {/* When the button is clicked, it will close the modal */}
                      <button
                        className="btn"
                        onClick={() => toggleModal(false)}
                      >
                        Close
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>

              <button
                className="bg-white text-black font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-gray-200"
                onClick={addToFavorites}
              >
                + Add to Favorites
              </button>
            </div>

            {/* Storyline */}
            <div className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Storyline</h2>
              <p className="text-gray-300 mb-4">{detail?.overview}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-100">Category</h3>
                  <p className="text-gray-400">
                    {detail?.genres?.map((genre) => genre.name).join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Poster Image */}
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500/${detail?.poster_path}`}
              alt={detail?.title}
              className="rounded-lg shadow-2xl w-[300px] hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-gray-100 py-8">
        <div className="text-2xl font-bold p-8 text-gray-800">Comments</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
          {reviews?.results?.map((item, index) => (
            <div
              className="bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105 hover:shadow-2xl relative"
              key={index}
            >
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 overflow-hidden rounded-full mr-4 flex-shrink-0">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${
                      item?.author_details?.avatar_path || "/default-avatar.png"
                    }`}
                    alt={item?.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-lg text-gray-800">
                    {item?.author}
                  </div>
                  <div className="text-sm text-gray-500">
                    Rating:{" "}
                    {item?.author_details?.rating || "No rating available"}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">{item?.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
