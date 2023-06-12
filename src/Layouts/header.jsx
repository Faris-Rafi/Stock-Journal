import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./styles/header.css";

import jurhamLogo from "../assets/Jurham.id.png";
import jurhamLogo2 from "../assets/Jurham.id-right.png";

export const Header = (data) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  return (
    <div className="container border-bottom mb-3">
      <div className="d-flex justify-content-between align-items-center">
        <span className="mb-2">
          <img src={jurhamLogo} alt="jurham logo" width={110} height={45} />
        </span>
        {data.data === undefined ? (
          <span
            className="mb-2"
            style={{ cursor: "pointer" }}
            onClick={handleClick}
          >
            Login <i className="bi bi-box-arrow-in-left"></i>
          </span>
        ) : (
          <span
            className="mb-2"
            style={{ cursor: "pointer" }}
            onClick={handleLogout}
          >
            Logout <i className="bi bi-box-arrow-in-right"></i>
          </span>
        )}
      </div>
    </div>
  );
};

export const PageHeader = ({ navigateTo }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(navigateTo);
  };

  return (
    <>
      <div className="container mb-3">
        <div className="d-flex justify-content-between align-items-center">
          <span style={{ cursor: "pointer" }} onClick={handleClick}>
            <i className="bi bi-arrow-left"></i> Back
          </span>
          <img src={jurhamLogo2} alt="" width={50} height={45} />
        </div>
      </div>
      <div className="border-bottom mb-3" />
    </>
  );
};
