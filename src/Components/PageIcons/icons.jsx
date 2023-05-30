import React from "react";
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tippy";

export const Icons = ({ iconName, title, navigateTo, disabled }) => {
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
          title="Login untuk mengakses fitur ini"
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

export const IconsBetween = ({ bg, icon, context, value }) => {
  return (
    <>
      <div className="d-flex justify-content-between my-3">
        <div className="d-flex mb-2">
          <div className={`${bg} px-2 py-1 rounded-circle me-2`}>
            <i className={`${icon} text-white`}></i>
          </div>
          <small className="py-1">{context}</small>
        </div>
        <div className="d-flex">
          <small className="py-1">
            <NumericFormat
              displayType="text"
              thousandSeparator={true}
              allowNegative={true}
              value={value}
              prefix="Rp. "
            />
          </small>
        </div>
      </div>
    </>
  );
};
