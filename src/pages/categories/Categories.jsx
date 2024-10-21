import axios from "axios";
import { useEffect, useState } from "react";
import CategoriesView from "./CategoriesView";

const Categories = () => {
  //Movie genre list
  const [genre, setGenre] = useState([]);
  const [genretv, setGenretv] = useState([]);

  // Fetch genres from the API
  const ambilGenre = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=9e6e84a1920044396f1c45215c787688"
      );
      // Update to set the genres from the response
      setGenre(response.data.genres);
    } catch (error) {
      console.log(error.message);
    }
  };

  const ambilGenretv = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/genre/tv/list?api_key=9e6e84a1920044396f1c45215c787688"
      );
      // Update to set the genres from the response
      setGenretv(response.data.genres);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    ambilGenre();
    ambilGenretv(); // Call the function to fetch genres when the component mounts
  }, []);

  useEffect(() => {
    console.log(genre); 
    console.log(genretv);// Log genre data when it updates
  }, [genre, genretv]);

  return <CategoriesView genre={genre} genretv={genretv} />;
};

export default Categories;
