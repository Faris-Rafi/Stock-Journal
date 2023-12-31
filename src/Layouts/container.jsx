import React from "react";
import Footer from "./footer";
import "./styles/container.css";

const Container = ({ children }) => {
  return (
    <div className="container__app">
      <div className="content p-4">{children}</div>
      <Footer />
    </div>
  );
};

export default Container;
