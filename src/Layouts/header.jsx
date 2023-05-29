import React from "react";
import Cookies from "js-cookie";

export const Header = (data) => {
  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  return (
    <div className="container border-bottom mb-3">
      <div className="d-flex justify-content-between align-items-center">
        <p className="fs-5">Jurham</p>
        {data.data === undefined ? (
          <p
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/login";
            }}
          >
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

export const PageHeader = ({ location }) => {
  return (
    <div className="container border-bottom mb-3">
      <p
        style={{ cursor: "pointer" }}
        onClick={(e) => {
          e.preventDefault();
          window.location.href = `${location}`;
        }}
      >
        <i className="bi bi-arrow-left"></i> Back
      </p>
    </div>
  );
};
