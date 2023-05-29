import React, { useEffect, useState } from "react";
import TitleCard from "../Components/Cards/titleCard";
import Icons from "../Components/PageIcons/icons";
import Cookies from "js-cookie";
import { fetchUser } from "../Services/api";
import { Header } from "../Layouts/header";

const Home = () => {
  const cookiesToken = Cookies.get("token");
  const [username, setUsername] = useState();

  if (cookiesToken) {
    useEffect(() => {
      const fetchData = async () => {
        const user = await fetchUser(cookiesToken);
        setUsername(user.name);
      };

      fetchData();
    }, []);
  }

  return (
    <>
    <Header data={username} />
      {!username ? (
        <TitleCard
          backgroundColor={"color__primary"}
          title={"Selamat datang"}
          link={"Login"}
          subtitle={"untuk akses lebih banyak fitur"}
        />
      ) : (
        <TitleCard
          backgroundColor={"color__primary"}
          title={"Selamat datang"}
          subtitle={`Halo ${username}`}
        />
      )}
      <p className="fw-bold mt-3">Alat & Lainnya</p>
      <div className="row">
        <Icons
          iconName={"bi bi-graph-up"}
          title={"AVG Up / Down"}
          navigateTo={"/select-avg"}
          disabled={true}
        />
        <Icons
          iconName={"bi bi-calculator-fill"}
          title={"Kalkulator Saham"}
          navigateTo={"/stock-calculator"}
        />
        <Icons
          iconName={"bi bi-arrow-down-up"}
          title={"ARA ARB"}
          navigateTo={"/ara-arb"}
        />
      </div>
    </>
  );
};

export default Home;
