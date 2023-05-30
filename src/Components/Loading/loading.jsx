import React from "react";

const Loading = () => {
  return (
    <div className="container__app">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text__primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
