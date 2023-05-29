import React from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tippy";

const Icons = ({ iconName, title, navigateTo, disabled }) => {
  const link = useNavigate();

  const handleClick = () => {
    link(navigateTo);
  };

  return (
    <>
      {!disabled ? (
        <div
          className="col-4 text-center"
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        >
          <button
            className={`${iconName} btn color__secondary text-white`}
          ></button>
          <p className={`fw-semibold text-center`} style={{ fontSize: "13px" }}>
            {title}
          </p>
        </div>
      ) : (
        <Tooltip
          title="Login to use this feature"
          position="top"
          trigger="click"
          animation="perspective"
          size="small"
          className="col-4 text-center"
        >
          <button
            className={`${iconName}  btn color__secondary text-white`}
            disabled
          ></button>

          <p
            className={`fw-semibold text-center text-secondary`}
            style={{ fontSize: "13px" }}
          >
            {title}
          </p>
        </Tooltip>
      )}
    </>
  );
};

export default Icons;
