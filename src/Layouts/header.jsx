import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

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
        <p className="fs-5">Jurham</p>
        {data.data === undefined ? (
          <p style={{ cursor: "pointer" }} onClick={handleClick}>
            Login <i className="bi bi-box-arrow-in-left"></i>
          </p>
        ) : (
          <p style={{ cursor: "pointer" }} onClick={handleLogout}>
            Logout <i className="bi bi-box-arrow-in-right"></i>
          </p>
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
    <div className="container border-bottom mb-3">
      <p style={{ cursor: "pointer" }} onClick={handleClick}>
        <i className="bi bi-arrow-left"></i> Back
      </p>
    </div>
  );
};
