import React from "react";
import { PageHeader } from "../Layouts/header";
import { TitleCard } from "../Components/Cards/Cards";
import Container from "../Layouts/container";

const AraArb = () => {
  return (
    <Container>
      <PageHeader navigateTo={"/"} />
      <TitleCard
        backgroundColor={"color__primary"}
        title={"Kalkulasi ARA ARB"}
      />
    </Container>
  );
};

export default AraArb;
