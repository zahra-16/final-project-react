import { useEffect, useState } from "react";
import { Card, CardFooter, Image } from "@nextui-org/react";

export const RatedTVShow = () => {
  const [ratedTVShows, setRatedTVShows] = useState([]);

  // Fetch rated TV shows from localStorage when component mounts
  useEffect(() => {
    const tvShows = JSON.parse(localStorage.getItem("ratedTVShows")) || [];
    setRatedTVShows(tvShows);
  }, []);

  if (!ratedTVShows.length) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-black">
        <h2 className="text-xl font-bold text-white">No Rated TV Shows Yet</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <h1 className="text-4xl font-bold text-center text-white mb-12">
        Your Rated TV Shows
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-9 px-20 py-24">
        {ratedTVShows.map((tvShow) => (
          <Card
            key={tvShow.id}
            isFooterBlurred
            radius="lg"
            className="border-none bg-gradient-to-br from-gray-800 to-black shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 max-w-xs mx-auto"
          >
            <Image
              alt={tvShow.name}
              className="object-cover rounded-t-lg"
              height={380}
              width={250}
              src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`}
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-b-lg bottom-1 w-full shadow-small ml-1 z-10">
              <p className="text-tiny text-white/80">You rated: {tvShow.userRating} stars</p>
              <p className="text-tiny text-white/80">
                {new Date(tvShow.first_air_date).toDateString()}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
