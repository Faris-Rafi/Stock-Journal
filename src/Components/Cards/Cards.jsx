import React, { useState } from "react";
import { NumericFormat } from "react-number-format";
import { IconsBurg } from "../PageIcons/icons";
import { useNavigate } from "react-router-dom";
import { AlertCapitalModal, DeleteAVGDetailModal } from "../Modal/modals";

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
    <>
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
          <div style={{ cursor: "pointer" }} onClick={handleClick}>
            <div className="d-flex flex-column">
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
            <div className="d-flex flex-column mt-3">
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
      </div>
    </>
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

export const JournalCard = ({
  backgroundColor,
  title,
  notes,
  buttonColor,
  onClick,
}) => {
  return (
    <div className={`card ${backgroundColor} shadow mb-3`}>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div>
            <h3 className="card-title text-white">{title}</h3>
            <p className="card-subtitle text-white">Catatan : {notes}</p>
          </div>
          <button className={`btn ${buttonColor}`} onClick={onClick}>
            <i className="bi bi-pencil-fill"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export const ProfitCard = ({ backgroundColor, avgDetail, fees }) => {
  let totalLot = 0;
  let totalTransaction = 0;
  let totalAmount = 0;

  avgDetail.detail.map((detail) => {
    let totalWithFee = 0;

    if (detail.action_type != "b") {
      if (avgDetail.is_fee_counting == "Y") {
        if (avgDetail.fee_transaction_id != 0) {
          fees.map((fee) => {
            if (avgDetail.fee_transaction_id == fee.id) {
              totalWithFee = parseInt(
                detail.price * (detail.lot * 100) -
                  (fee.sell / 100) * (detail.price * (detail.lot * 100))
              );
            }
          });
        } else {
          avgDetail.custom_fee.map((fee) => {
            totalWithFee = parseInt(
              detail.price * (detail.lot * 100) -
                (fee.sell / 100) * (detail.price * (detail.lot * 100))
            );
          });
        }
      } else {
        totalWithFee = parseInt(detail.price * (detail.lot * 100));
      }

      totalLot -= parseInt(detail.lot);
      totalAmount -= parseInt(totalWithFee);
    } else {
      if (avgDetail.is_fee_counting == "Y") {
        if (avgDetail.fee_transaction_id != 0) {
          fees.map((fee) => {
            if (avgDetail.fee_transaction_id == fee.id) {
              totalWithFee = parseInt(
                detail.price * (detail.lot * 100) +
                  (fee.buy / 100) * (detail.price * (detail.lot * 100))
              );
            }
          });
        } else {
          avgDetail.custom_fee.map((fee) => {
            totalWithFee = parseInt(
              detail.price * (detail.lot * 100) +
                (fee.buy / 100) * (detail.price * (detail.lot * 100))
            );
          });
        }
      } else {
        totalWithFee = parseInt(detail.price * (detail.lot * 100));
      }

      totalLot += parseInt(detail.lot);
      totalAmount += parseInt(totalWithFee);
    }
  });

  totalTransaction = parseInt(totalAmount);

  let totalSell = 0;
  if (avgDetail.is_fee_counting == "Y") {
    if (avgDetail.fee_transaction_id != 0) {
      fees.map((fee) => {
        if (avgDetail.fee_transaction_id == fee.id) {
          totalSell = parseInt(
            avgDetail.target_sell * (totalLot * 100) -
              (fee.sell / 100) * (avgDetail.target_sell * (totalLot * 100))
          );
        }
      });
    } else {
      avgDetail.custom_fee.map((fee) => {
        totalSell = parseInt(
          avgDetail.target_sell * (totalLot * 100) -
            (fee.sell / 100) * (avgDetail.target_sell * (totalLot * 100))
        );
      });
    }
  } else {
    totalSell = avgDetail.target_sell * (totalLot * 100);
  }

  const profit = totalSell - totalTransaction;
  return (
    <div className={`card ${backgroundColor} shadow my-4`}>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <div
              className={`rounded-circle py-1 px-2 me-2 ${
                profit < 0 ? "bg-danger" : "bg-success"
              }`}
            >
              <i className="bi bi-receipt text-white"></i>
            </div>
            <small className="py-1">Potensi Profit : </small>
          </div>
          <small className="py-1">
            <NumericFormat
              thousandSeparator={true}
              displayType={"text"}
              value={profit}
              prefix="Rp."
              className={`${profit < 0 ? "text-danger" : "text-success"}`}
            />
          </small>
        </div>
      </div>
    </div>
  );
};

export const ResultAvgCard = ({ bg, avgDetail, onOpen, fees }) => {
  let totalLot = 0;
  let totalValue = 0;
  let totalAmount = 0;
  let totalTransaction = 0;
  let totalAvg = 0;

  avgDetail.detail.map((detail) => {
    let totalWithFee = 0;

    if (detail.action_type != "b") {
      if (avgDetail.is_fee_counting == "Y") {
        if (avgDetail.fee_transaction_id != 0) {
          fees.map((fee) => {
            if (avgDetail.fee_transaction_id == fee.id) {
              totalWithFee = parseInt(
                detail.price * (detail.lot * 100) -
                  (fee.sell / 100) * (detail.price * (detail.lot * 100))
              );
            }
          });
        } else {
          avgDetail.custom_fee.map((fee) => {
            totalWithFee = parseInt(
              detail.price * (detail.lot * 100) -
                (fee.sell / 100) * (detail.price * (detail.lot * 100))
            );
          });
        }
      } else {
        totalWithFee = parseInt(detail.price * (detail.lot * 100));
      }

      totalLot -= parseInt(detail.lot);
      totalValue -= parseInt(detail.price);
      totalAmount -= parseInt(totalWithFee);
    } else {
      if (avgDetail.is_fee_counting == "Y") {
        if (avgDetail.fee_transaction_id != 0) {
          fees.map((fee) => {
            if (avgDetail.fee_transaction_id == fee.id) {
              totalWithFee = parseInt(
                detail.price * (detail.lot * 100) +
                  (fee.buy / 100) * (detail.price * (detail.lot * 100))
              );
            }
          });
        } else {
          avgDetail.custom_fee.map((fee) => {
            totalWithFee = parseInt(
              detail.price * (detail.lot * 100) +
                (fee.buy / 100) * (detail.price * (detail.lot * 100))
            );
          });
        }
      } else {
        totalWithFee = parseInt(detail.price * (detail.lot * 100));
      }

      totalLot += parseInt(detail.lot);
      totalValue += parseInt(detail.price);
      totalAmount += parseInt(totalWithFee);
    }

    totalTransaction = parseInt(totalAmount);
    totalAvg = (totalValue * totalLot) / totalLot;

    if (totalLot == 0) {
      totalAvg = 0;
    }
  });

  let capitalRemain = 0;
  if (avgDetail.capital_limit != 0) {
    capitalRemain = avgDetail.capital_limit - totalTransaction;
  }

  const decimal = Math.max(
    0,
    Math.min(2, (totalAvg.toString().split(".")[1] || "").length)
  );
  const [open, setOpen] = useState(true);
  return (
    <div className={`card shadow ${bg}`}>
      <div className="card-body">
        {capitalRemain < 0 && (
          <AlertCapitalModal Open={open} onClose={() => setOpen(false)} />
        )}
        <div className="d-flex justify-content-between mb-3">
          <div className="d-flex">
            <div className={`rounded-circle py-1 px-2 me-2 bg-primary`}>
              <i className="bi bi-cash text-white"></i>
            </div>
            <small className="py-1">AVG : </small>
          </div>
          <div className="d-flex">
            <small className="py-1">
              <NumericFormat
                thousandSeparator={true}
                displayType={"text"}
                value={totalAvg.toFixed(decimal)}
                prefix="Rp."
                className={`me-1 text-primary`}
              />
            </small>
          </div>
        </div>
        <div className="d-flex justify-content-between mb-3">
          <div className="d-flex">
            <div className={`rounded-circle py-1 px-2 me-2 bg-danger`}>
              <i className="bi bi-currency-dollar text-white"></i>
            </div>
            <small className="py-1">
              Total{" "}
              {avgDetail.is_fee_counting == "Y" ? "(+fee)" : "(tanpa fee)"} :{" "}
            </small>
          </div>
          <div className="d-flex">
            <small className="py-1 text-danger">
              <NumericFormat
                thousandSeparator={true}
                displayType={"text"}
                value={totalTransaction}
                prefix="Rp."
                className={`me-1`}
              />{" "}
              ({totalLot} Lot)
            </small>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <div className={`rounded-circle py-1 px-2 me-2 bg-secondary`}>
              <i className="bi bi-bank text-white"></i>
            </div>
            <small className="py-1">Modal : </small>
          </div>
          <div className="d-flex">
            <small className="py-1">
              {avgDetail.capital_limit != 0 ? (
                <>
                  <NumericFormat
                    thousandSeparator={true}
                    displayType={"text"}
                    value={avgDetail.capital_limit}
                    prefix="Rp."
                    className={`me-1 text-secondary`}
                  />
                  <i
                    onClick={onOpen}
                    style={{ cursor: "pointer" }}
                    className="bi bi-pencil-fill py-1 px-2 rounded color__secondary text-white"
                  ></i>
                </>
              ) : (
                <>
                  <i className="bi bi-infinity py-1 me-2"></i>
                  <i
                    onClick={onOpen}
                    style={{ cursor: "pointer" }}
                    className="bi bi-pencil-fill py-1 px-2 rounded color__secondary text-white"
                  ></i>
                </>
              )}
            </small>
          </div>
        </div>
        {avgDetail.capital_limit != 0 && (
          <div className="d-flex justify-content-between mt-3">
            <div className="d-flex">
              <div
                className={`rounded-circle py-1 px-2 me-2 ${
                  capitalRemain < 0
                    ? "bg-danger"
                    : capitalRemain == 0
                    ? "bg-secondary"
                    : "bg-success"
                }`}
              >
                <i className="bi bi-wallet text-white"></i>
              </div>
              <small className="py-1">Sisa Modal : </small>
            </div>
            <div className="d-flex">
              <small className="py-1">
                <NumericFormat
                  thousandSeparator={true}
                  displayType={"text"}
                  value={capitalRemain}
                  prefix="Rp."
                  className={`me-1 ${
                    capitalRemain < 0 ? "text-danger" : "text-success"
                  }`}
                />
              </small>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const AvgCard = ({
  backgroundColor,
  number,
  price,
  lot,
  totalAvg,
  total,
  onClick,
  actionType,
  avgDetail,
}) => {
  return (
    <>
      <div className={`card shadow ${backgroundColor} mb-3`}>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div>
              <small
                className={`${
                  actionType == "b" ? "text-success" : "text-danger"
                }`}
              >
                # {number}
              </small>
              <small
                className={`${
                  actionType == "b" ? "text-success" : "text-danger"
                } ms-4`}
              >
                {actionType == "b" ? "Membeli" : "Menjual"} :{" "}
                <NumericFormat
                  thousandSeparator={true}
                  displayType={"text"}
                  value={price}
                  prefix="Rp."
                />{" "}
                x {lot} lot
              </small>
            </div>
            <button className="btn btn-sm btn-danger" onClick={onClick}>
              <i className="bi bi-trash3"></i>
            </button>
          </div>
          <small className="text-secondary"></small>
          <small className="text-secondary d-block mt-1">
            AVG Pada titik ini :{" "}
            <NumericFormat
              thousandSeparator={true}
              displayType={"text"}
              value={totalAvg}
              prefix="Rp."
            />{" "}
          </small>
          <small className="text-secondary">
            Total {avgDetail.is_fee_counting == "Y" ? "(+fee)" : "(tanpa fee)"}{" "}
            :{" "}
            <NumericFormat
              thousandSeparator={true}
              displayType={"text"}
              value={total}
              prefix="Rp."
            />
          </small>
        </div>
      </div>
    </>
  );
};
