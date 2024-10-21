import { Link } from "react-router-dom";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import { useState } from "react";
import { AlignJustify, Play } from "lucide-react"; // Assuming you're using Lucide icons

const FilmView = ({ movie, videoUrl, nowPlayingMovies, popularMovies, topRatedMovies, upcomingMovies }) => {
  const [selectedCategory, setSelectedCategory] = useState("nowPlaying");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const movieTitle = movie?.original_title || movie?.title;

  const categories = [
    { name: "nowPlaying", label: "Now Playing" },
    { name: "popular", label: "Popular" },
    { name: "topRated", label: "Top Rated" },
    { name: "upcoming", label: "Upcoming" },
  ];

  const renderMovies = () => {
    switch (selectedCategory) {
      case "popular":
        return popularMovies;
      case "topRated":
        return topRatedMovies;
      case "upcoming":
        return upcomingMovies;
      default:
        return nowPlayingMovies;
    }
  };

  return (
    <div className="text-black dark:text-white bg-white dark:bg-black font-sans min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-center px-8 text-center h-[900px] flex-col">
        {videoUrl && (
          <iframe
            className="absolute inset-0 w-full h-full z-0"
            src={`${videoUrl}?autoplay=1&mute=1&loop=1&playlist=${videoUrl.split("/")[4]}`}
            title={movieTitle}
            frameBorder="0"
            allow="accelerometer; autoplay; fullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
        
        <div className="bg-gradient-to-b from-transparent to-white dark:to-black absolute inset-0 z-10"></div>

        {movie && (
          <div className="relative z-20 p-9 pt-72">
            <h1 className="text-3xl font-bold underline underline-offset-8 text-black dark:text-white ">{movieTitle}</h1>
            <div className="flex space-x-4 pt-24">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                className="w-[200px] rounded-md"
                alt={movieTitle}
              />
              <div className="flex flex-col justify-between">
                <p className="text-lg mb-4 px-4 pt-36">{movie?.overview}</p>
                <Link to={`/detail/${movie?.id}`}>
                  <Button className="bg-slate-400 hover:bg-slate-700 text-black py-2 px-4 rounded-md">
                    See More
                    <Play/>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Movie List Section */}
      <section>
        <div className="flex items-start text-black dark:text-white bg-white dark:bg-black p-4">
          <button
            className="text-white p-3 bg-black rounded-md shadow-lg hover:bg-gray-800 transition-all"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <AlignJustify size={24} />
          </button>
        </div>
      </section>
      <section className="flex">
        <aside className={`bg-white dark:bg-black overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'w-1/4' : 'w-0'}`}>
          <h4 className="text-xl font-bold mb-4 text-center">Categories</h4>
          <ul>
            {categories.map((category) => (
              <li key={category.name}>
                <button
                  className={`w-full text-left p-2 rounded ${selectedCategory === category.name ? 'bg-gray-400 dark:bg-gray-700' : ''}`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main className={`transition-all duration-300 ${isSidebarOpen ? 'w-3/4' : 'w-full'} bg-white dark:bg-black min-h-screen pb-28 py-3 px-8`}>
          <h4 className="text-3xl font-bold mb-8 text-black dark:text-white">
            {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {renderMovies()?.map((movie, index) => (
              <Card
                key={index}
                isFooterBlurred
                radius="lg"
                className="border-none bg-gradient-to-br from-gray-800 to-black shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 max-w-[180px] mx-auto"
              >
                <Image
                  alt={movie.title}
                  className="object-cover rounded-t-lg"
                  height={270}
                  width={180}
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                />
                <CardFooter className="flex justify-between before:bg-black/40 border-white/20 border-1 py-1 absolute bottom-1 w-full shadow-small z-10 transition-all duration-300 hover:bg-gray-800/80">
                  <div className="group transition-all duration-300">
                    <h6 className="text-white font-semibold text-xs truncate group-hover:scale-105 group-hover:text-yellow-400">
                      {movie.title.length > 15 ? movie.title.slice(0, 15) + '...' : movie.title}
                    </h6>
                    <p className="text-xs text-white/60 group-hover:text-yellow-400">
                      Rating: {movie.vote_average}
                    </p>
                  </div>
                  <Link to={`/detail/${movie.id}`}>
                    <Button
                      className="text-xs text-white bg-gray-800/60 hover:bg-yellow-400 hover:text-black transition-colors duration-300"
                      variant="flat"
                      color="default"
                      radius="lg"
                      size="sm"
                    >
                      Watch Now
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </section>
    </div>
  );
};

export default FilmView;
