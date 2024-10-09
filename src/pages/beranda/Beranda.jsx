import axios from "axios";
// import { Film, Link } from "lucide-react";
import { useEffect, useState } from "react";
import BerandaView from "./BerandaView";

const Beranda = () => {
  const [data, setData] = useState();
  const [movie, setMovie] = useState();
  const [top, setTop] = useState();
  const [tayang, setTayang] = useState();
  const [datang, setDatang] = useState();


  // const zahran = {
  //   nama: "zahran",
  //   kelas: "11 rpl 3",
  //   pembalajaran: {
  //     sekarang: "bk",
  //     selanjutnya: "pkk",
  //     mapelHariIni: [
  //       { nama: "agama", jam: 10 },
  //       { nama: "b inggris", jam: 3 },
  //       { nama: "pkk", jam: 4 },
  //       { nama: "bkk", jam: 4 },
  //     ],
  //   },
  // };

  // console.log(zahran.pembalajaran.mapelHariIni[2]);


  const ambilData = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?api_key=9e6e84a1920044396f1c45215c787688"
      );
      const dataObjek = response.data;
      // Hasil film adalah dataObjek.results
      // console.log(dataObjek.results);
      setData(dataObjek.results);
    } catch (error) {
      console.log(error.message);
    }
  };

  const ambilTayang = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=9e6e84a1920044396f1c45215c787688"
      );
      const dataObjek = response.data;
      setTayang(dataObjek.results);
    } catch (error) {
      console.log(error.message);
    }
  };

  const ambilTop = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=9e6e84a1920044396f1c45215c787688"
      );
      const dataObjek = response.data;
      // Hasil film adalah dataObjek.results
      // console.log(dataObjek.results);
      setTop(dataObjek.results);
    } catch (error) {
      console.log(error.message);
    }
  };

  const ambilDatang = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=9e6e84a1920044396f1c45215c787688"
      );
      const dataObjek = response.data;
      setDatang(dataObjek.results);
    } catch (error) {
      console.log(error.message);
    }
  };
  
  useEffect(() => {
    ambilTop();
  }, []);

  useEffect(() => {
    ambilTayang();
  }, []);

  useEffect(() => {
    ambilData();
  }, []);

  useEffect(() => {
    ambilDatang();
  }, []);

  useEffect(() => {
    console.log(data);
    console.log(top);
    console.log(tayang);
    console.log(datang);


    if (data) {
      const randomElement = data[Math.floor(Math.random() * data.length)];

      console.log(randomElement);
      setMovie(randomElement);
    }
    // Mendapatkan elemen acak dari array
  }, [data, top, tayang, datang]);
  return <BerandaView movie={movie} data={data} top={top} tayang={tayang} datang={datang}/>;
};


export default Beranda;
