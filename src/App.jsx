import { Navbar } from "@nextui-org/react";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarComp from "./components/Navbar";
import Beranda from "./pages/beranda/Beranda";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
    <NavbarComp/>
      <Routes>
        <Route path="/" element={<Beranda />} />
        {/* <Route path="/movie" element={<Film />} /> */}
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}
