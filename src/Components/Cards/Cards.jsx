import React from "react";
import { NumericFormat } from "react-number-format";
import { IconsBurg } from "../PageIcons/icons";
import { useNavigate } from "react-router-dom";

export const PlainCard = ({ children, bg }) => {
  return (
    <div className={`card shadow ${bg}`}>
      <div className="card-body">{children}</div>
    </div>
  );
};

export const SelectCard = ({
  title,
  price,
  lot,
  targetSell,
  profit,
  totalData,
  navigateTo,
  delOnClick,
  profitColor,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(navigateTo);
  };

  return (
    <div className={`card shadow my-3`}>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <span
            className="text-black fs-5"
            style={{ cursor: "pointer" }}
            onClick={handleClick}
          >
            {title}
          </span>
          <button className="btn btn-sm btn-danger" onClick={delOnClick}>
            <i className="bi bi-trash3"></i>
          </button>
        </div>
        <div
          className="d-flex flex-column"
          style={{ cursor: "pointer" }}
          onClick={handleClick}
        >
          <small className="text-secondary">
            Avg ={" "}
            <NumericFormat
              displayType="text"
              value={price}
              prefix="Rp."
              thousandSeparator={true}
            />{" "}
            x{" "}
            <NumericFormat
              displayType="text"
              value={lot}
              thousandSeparator={true}
            />{" "}
            Lot ({totalData} Data)
          </small>
          <small className="text-secondary">
            Target Jual ={" "}
            <NumericFormat
              displayType="text"
              value={targetSell}
              prefix="Rp."
              thousandSeparator={true}
            />
          </small>
        </div>
        <div
          className="d-flex flex-column mt-3"
          style={{ cursor: "pointer" }}
          onClick={handleClick}
        >
          <small className="text-secondary">Potensi Profit</small>
          <h5 className={`${profitColor}`}>
            <NumericFormat
              displayType="text"
              value={profit}
              prefix="Rp."
              thousandSeparator={true}
            />
          </h5>
        </div>
      </div>
    </div>
  );
};

export const TitleCard = ({ backgroundColor, title, subtitle, link }) => {
  return (
    <div className={`card ${backgroundColor} shadow`}>
      <div className="card-body">
        <h3 className="card-title text-white text-center">{title}</h3>
        <p className="card-subtitle text-white text-center">
          <a href="/login" className="text-white">
            {link}
          </a>{" "}
          {subtitle}
        </p>
      </div>
    </div>
  );
};
