import React from "react";
import TitleCard from "../Components/Cards/titleCard";
import Icons from "../Components/PageIcons/icons";

const Home = () => {
  return (
    <>
      <TitleCard
        backgroundColor={"color__primary"}
        title={"Welcome"}
        link={"Login"}
        subtitle={"for more features"}
      />
      <p className="fw-bold mt-3">Tools & More</p>
      <div className="row">
        <Icons
          iconName={"bi bi-graph-up"}
          title={"AVG Up / Down"}
          navigateTo={"/select-avg"}
          disabled={true}
        />
        <Icons
          iconName={"bi bi-calculator-fill"}
          title={"Stock Calculator"}
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
