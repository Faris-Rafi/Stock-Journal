import React from "react";

const Header = () => {
  return (
    <div className="container border-bottom mt-3">
      <div className="d-flex justify-content-between align-items-center">
        <p className="fs-5">Stock Journal</p>
        <p
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/login";
          }}
        >
          Login <i className="bi bi-box-arrow-in-left"></i>
        </p>
      </div>
    </div>
  );
};

export default Header;
