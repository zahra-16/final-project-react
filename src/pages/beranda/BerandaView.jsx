export default function BerandaView({ data, movie, top, tayang, datang }) {
  try {
    return (
      <div className="text-white font-sans min-h-screen">
        {/* Hero Section */}
        <section
          className="z-0 bg-cover bg-center py-32 px-8 text-center h-[900px]"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
          }}
        >
          <h1 className="text-4xl font-bold mb-4 text-start">
            Unlimited movies, TV shows, and more.
          </h1>
          <p className="text-xl mb-8 text-start">Watch anywhere, anytime.</p>
          <button className="bg-red-600 text-white py-2 px-6 rounded-full text-lg hover:bg-red-700 flex items-start">
            Start watching
          </button>

          <div className="card w-[200px] rounded-md pt-36">
            <figure>
              <div className="flex flex-col">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  className="w-full"
                />
                <h1 className="text-center">{movie.title}</h1>
              </div>
            </figure>
          </div>
        </section>
        <section className="overflow-x-clip">
          <div className="bg-white w-[98rem] h-48 relative right-5 bottom-9 blur-md"></div>
        </section>

        {/* Popular Shows Section */}
        <section className="bg-white w-full min-h-screen relative bottom-24 py-12 px-8">
          <h4 className="text-3xl font-bold mb-8 text-black">Trending Movie</h4>
          <div className="carousel w-full">
            <div className=" rounded-box w-96 py-4 flex gap-3">
              {data?.map((film, index) => {
                return (
                  <div key={index} className="carousel-item w-1/2">
                    <div className="flex flex-col">
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                        className="w-full"
                      />
                      <h1 className="text-center text-black">{film.title}</h1>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Movie Now Playing Shows Section */}
        <section className="bg-white w-full min-h-screen relative bottom-[330px]  px-8">
          <h4 className="text-3xl font-bold mb-8 text-black">Movie Now Playing</h4>
          <div className="carousel w-full">
            <div className=" rounded-box w-96 py-4 flex gap-3">
              {tayang?.map((film, index) => {
                return (
                  <div key={index} className="carousel-item w-1/2">
                    <div className="flex flex-col">
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                        className="w-full"
                      />
                      <h1 className="text-center text-black">{film.title}</h1>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Top Rated Shows Section */}
        <section className="bg-white w-full min-h-screen relative bottom-[590px]  px-8">
          <h4 className="text-3xl font-bold mb-8 text-black">Top Rated Movie</h4>
          <div className="carousel w-full">
            <div className=" rounded-box w-96 py-4 flex gap-3">
              {top?.map((film, index) => {
                return (
                  <div key={index} className="carousel-item w-1/2">
                    <div className="flex flex-col">
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                        className="w-full"
                      />
                      <h1 className="text-center text-black">{film.title}</h1>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Upcoming Shows Section */}
        <section className="bg-white w-full min-h-screen relative bottom-[800px] px-8">
          <h4 className="text-3xl font-bold mb-8 text-black">Upcoming Movie</h4>
          <div className="carousel w-full">
            <div className=" rounded-box w-96 py-4 flex gap-3">
              {datang?.map((film, index) => {
                return (
                  <div key={index} className="carousel-item w-1/2">
                    <div className="flex flex-col">
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                        className="w-full"
                      />
                      <h1 className="text-center text-black">{film.title}</h1>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.log(error);
  }
}
