import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Card, CardFooter, Button, Image } from "@nextui-org/react";
import axios from "axios";

export const BerandaDetail = () => {
  const [detail, setDetail] = useState();
  const [video, setVideo] = useState();
  const [isModalOpen, toggleModal] = useState(false);
  const [reviews, setReviews] = useState();
  const [userRating, setUserRating] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [credits, setCredits] = useState([]); // State for credits
  const [ratedList, setRatedList] = useState([]);
  const [favoriteList, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const { id } = useParams();
  const API_KEY = "9e6e84a1920044396f1c45215c787688";
  const header = {
    headers: {
      Accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjBjZjY5YTM2MzQ4ZDRmN2FiYWNjZjA1MjFkYTI3YiIsIm5iZiI6MTcyODM1NzE0NS40ODY3NzgsInN1YiI6IjY3MDQ4MTgyMmFlN2ViOTA4NGJmZjhkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.crJb5j17MxytlS-PyQeUCvXVGR_9aXalB0cSnDoSatg",
    },
  };

  useEffect(() => {
    console.log(credits);
  }, [credits]);

  // Fetch movie or TV show details
  const ambilDetail = async () => {
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
  const ambilVideo = async () => {
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
  const ambilReviews = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}`
      );
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error.message);
    }
  };

  // Fetch credits
  const ambilCredits = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
      );
      setCredits(response.data.cast); // Save only the cast
    } catch (error) {
      console.error("Error fetching credits:", error.message);
    }
  };

  const ambilRating = async () => {
    const url = "https://api.themoviedb.org/3/account/null/rated/movies";
    try {
      const response = await axios.get(url, header);
      console.log(response.data);
      setRatedList(response.data.results);
    } catch (error) {
      console.log("Error fetching rating:", error.message);
    }
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

  const postRating = async (rating) => {
    const url = `https://api.themoviedb.org/3/movie/${id}/rating`;
    const body = {
      value: rating,
    };
    try {
      const res = await axios.post(url, body, header);
      console.log(res.data);
    } catch (error) {
      console.log("Error submitting rating:", error.message);
    }
  };

  const tambahFavorit = async () => {
    const url = `https://api.themoviedb.org/3/account/{account_id}/favorite`;
    const body = {
      media_type: "movie",
      media_id: id,
      favorite: true,
    };

    try {
      const res = await axios.post(url, body, header);
      console.log(res.data);
      setIsFavorite(true);
    } catch (error) {
      console.log("Error submitting rating:", error.message);
    }
  };

  const hapusFavorit = async () => {
    const url = `https://api.themoviedb.org/3/account/{account_id}/favorite`;
    const body = {
      media_type: "movie",
      media_id: id,
      favorite: false,
    };
    try {
      const res = await axios.post(url, body, header);
      console.log(res.data);
      setIsFavorite(false);
    } catch (error) {
      console.log("Error submitting rating:", error.message);
    }
  };

  const getCurrentMovieRatings = () => {
    const index = ratedList.findIndex((movie) => movie.id == id);
    if (!ratedList[index]) {
      return;
    }
    setUserRating(ratedList[index].rating);
  };

  const getCurrentMovieFavorite = () => {
    const index = favoriteList.findIndex((movie) => movie.id == id);
    if (!favoriteList[index]) {
      setIsFavorite(false);
      return;
    }
    setIsFavorite(true);
    // setIsFavorite(favoriteList[index].rating);
  };

  useEffect(() => {
    ambilRating();
    ambilFavorit();
    ambilDetail();
    ambilVideo();
    ambilReviews();
    ambilCredits(); // Fetch credits as well
  }, [id]);

  useEffect(() => {
    if (!ratedList) {
      return;
    }
    getCurrentMovieRatings();
  }, [ratedList]);

  useEffect(() => {
    if (!favoriteList) {
      return;
    }
    getCurrentMovieFavorite();
  }, [favoriteList]);

  // Handle rating functionality
  const handleRating = (rating) => {
    setUserRating(rating);
    postRating(rating);
    // setUserRating(rating);
    // let ratedMovies = JSON.parse(localStorage.getItem("ratedMovies")) || [];
    // const movieExists = ratedMovies.some((movie) => movie.id === detail.id);

    // if (!movieExists) {
    //   ratedMovies.push({ ...detail, userRating: rating });
    // } else {
    //   ratedMovies = ratedMovies.map((movie) =>
    //     movie.id === detail.id ? { ...movie, userRating: rating } : movie
    //   );
    // }

    // localStorage.setItem("ratedMovies", JSON.stringify(ratedMovies));
    // setAlertMessage(`${detail.title} has been rated ${rating} stars.`);
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info h-6 w-6 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>{alertMessage}</span>
          <div className="flex justify-center space-x-2 w-full max-w-[200px]">
            <button className="btn btn-sm" onClick={() => setAlertMessage("")}>
              Deny
            </button>
            <button
              className="btn btn-sm bg-black text-white"
              onClick={() => setAlertMessage("")}
            >
              Accept
            </button>
          </div>
        </div>
      )}

      <section className="relative flex-col flex items-center justify-center min-h-screen">
        <div className="absolute inset-0">
          <img
            src={`https://image.tmdb.org/t/p/w1280/${detail?.backdrop_path}`}
            alt="Backdrop"
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto p-6 space-y-8 lg:space-y-0 lg:space-x-12">
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

              {isFavorite ? (
                <button
                  className="bg-white text-black font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-gray-200"
                  onClick={hapusFavorit}
                >
                  + Remove from Favorites
                </button>
              ) : (
                <button
                  className="bg-white text-black font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-gray-200"
                  onClick={tambahFavorit}
                >
                  + Add to Favorites
                </button>
              )}
            </div>

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
                <div>
                  {/* <div
                    className="radial-progress w-12 text-white h-12 text-xs absolute bottom-8 right-8"
                    style={{ "--value": detail.vote_average * 10 }}
                  >
                    {detail.vote_average}
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500/${detail?.poster_path}`}
              alt={detail?.title}
              className="rounded-lg shadow-2xl w-[300px] hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* Credits Section */}
      <section className="bg-gray-200 py-8 p-4 dark:bg-black ">
        <div className="text-3xl font-bold p-8 text-gray-800 dark:text-white text-center">
          Cast
        </div>
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-8">
          {credits.map((castMember) => (
            <div
              key={castMember.id}
              className="relative min-w-[200px] transform hover:scale-105 transition ease-in-out duration-300 group"
            >
              <Card isFooterBlurred radius="lg" className="border-none">
                <Image
                  alt={castMember.name}
                  className="object-cover"
                  height={300}
                  src={`https://image.tmdb.org/t/p/w500/${
                    castMember.profile_path || "/default-avatar.png"
                  }`}
                  width={200}
                />
                <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                  <p className="text-tiny text-white/80">
                    {castMember.character}
                  </p>
                  <Button
                    className="text-tiny text-white bg-black/20"
                    variant="flat"
                    color="default"
                    radius="lg"
                    size="sm"
                  >
                    More Info
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-white py-8 dark:bg-black">
        <div className="text-3xl font-bold p-8 text-gray-800 dark:text-white text-center">
          Comments
        </div>
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
                    {item.author}
                  </div>
                  <div className="text-sm text-gray-500">
                    Rating: {item.author_details?.rating || "N/A"}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 line-clamp-2">{item.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
