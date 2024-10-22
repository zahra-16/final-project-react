import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarComp from "./components/Navbar";
import Beranda from "./pages/beranda/Beranda";
import Film from "./pages/film/Film";
import { Footer } from "./components/Footer";
import { BerandaDetail } from "./pages/berandadetail/BerandaDetail";
import { Favorite } from "./pages/Favorite";
import Categories from "./pages/categories/Categories";
import { MovieDetail } from "./pages/MovieDetail";
import { RatedMovie } from "./pages/RatedMovie";
import { TvDetail } from "./pages/TvDetail";
import ThemeContext from "./components/context/ThemeContext";
import { Provider } from "react-redux";
import store from "./store/store";
import SearchSelengkapnya from "./pages/search/SearchSelengkapnya";

export default function App() {
  const theme = useState("dark");
  return (
    <BrowserRouter>
      <ThemeContext.Provider value={theme}>
        <Provider store={store}>
          <NavbarComp />
          <Routes>
            <Route path="/" element={<Beranda />} />
            <Route path="/detail/:id" element={<BerandaDetail />} />
            <Route path="/moviedetail/:id" element={<MovieDetail />} />
            <Route path="/tvdetail/:id" element={<TvDetail />} />
            <Route path="/Category" element={<Categories />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/rated-movies" element={<RatedMovie />} />
            <Route path="/film" element={<Film />} />
            <Route path="/search" element={<SearchSelengkapnya />} />
            {/* <Route path="/movie" element={<Film />} /> */}
          </Routes>
          <Footer />
        </Provider>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}
