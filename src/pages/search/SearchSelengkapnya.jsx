import axios from "axios";
import { useEffect, useState } from "react";
import { SearchSelengkapnyaView } from "./SearchSelengkapnyaView";
import { useSearchParams } from "react-router-dom";

export const SearchSelengkapnya = () => {
  const [movie, setMovie] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("q");

  // Fetch genres from the API
  const searchAll = async (query) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/multi?query=${query}&api_key=9e6e84a1920044396f1c45215c787688`
      );
      // Update to set the genres from the response
      setMovie(response.data.results);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    searchAll(search);
  }, []);

  useEffect(() => {
    console.log(movie);
  }, [movie]);

  return <SearchSelengkapnyaView movie={movie} />;
};

export default SearchSelengkapnya;
