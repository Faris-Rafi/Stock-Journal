import React from "react";

const PlainCard = ({ children, bg }) => {
  return (
    <div className={`card shadow ${bg}`}>
      <div className="card-body">{children}</div>
    </div>
  );
};

export default PlainCard;
