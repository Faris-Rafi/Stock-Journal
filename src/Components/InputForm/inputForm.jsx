import React from "react";
import { NumericFormat } from "react-number-format";

export const Input = ({
  inputLabel,
  typeInput,
  nameInput,
  placeholder,
  value,
  onKeyDown,
  onChange,
  error,
}) => {
  return (
    <div className="form-group mb-3">
      <label className="form-label">{inputLabel}</label>
      <input
        type={typeInput}
        name={nameInput}
        className={`form-control shadow-sm ${error && "is-invalid"}`}
        placeholder={placeholder}
        value={value}
        onKeyDown={onKeyDown}
        onChange={onChange}
      />
      <p className="text-danger">{error}</p>
    </div>
  );
};

export const NumericInput = ({
  inputLabel,
  nameInput,
  allowN,
  value,
  onKeyDown,
  onChange,
  error,
  placeholder,
}) => {
  return (
    <div className="form-group mt-2">
      <label className="form-label">{inputLabel}</label>
      <NumericFormat
        thousandSeparator={true}
        allowNegative={allowN}
        name={nameInput}
        placeholder={placeholder}
        className={`form-control shadow-sm ${error && "is-invalid"}`}
        value={value}
        onKeyDown={onKeyDown}
        onChange={onChange}
      />
      <small className="text-danger">{error}</small>
    </div>
  );
};

export const SelectInput = ({
  children,
  inputLabel,
  nameInput,
  value,
  onKeyDown,
  onChange,
  error,
}) => {
  return (
    <div className="form-group mt-3">
      <label className="form-label">{inputLabel}</label>
      <select
        name={nameInput}
        className={`form-select shadow-sm ${error && "is-invalid"}`}
        value={value}
        onKeyDown={onKeyDown}
        onChange={onChange}
      >
        {children}
      </select>
      <p className="text-danger">{error}</p>
    </div>
  );
};

export const GroupInput = ({
  inputLabel,
  nameInput,
  error,
  value,
  targetSell,
  onChange,
  onClick,
}) => {
  return (
    <>
      <div className="input-group">
        <span className="input-group-text shadow-sm">{inputLabel}</span>
        <NumericFormat
          thousandSeparator={true}
          name={nameInput}
          className={`form-control shadow-sm ${error && "is-invalid"}`}
          value={value}
          onChange={onChange}
        />
        <button
          className={`btn color__secondary text-white shadow-sm ${
            value == targetSell ||
            error ||
            value.replace(/,/g, "") == targetSell
              ? "disabled"
              : ""
          }`}
          onClick={onClick}
        >
          Save
        </button>
      </div>
      <div className="text-danger d-flex justify-content-center">{error}</div>
    </>
  );
};

export const InputCheck = ({ checked, onChange, onClick }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mt-3">
      <div className="form-check">
        <input
          className="form-check-input shadow-sm border-black"
          type="checkbox"
          checked={checked}
          onChange={onChange}
          id="count_fee"
        />
        <label className="form-check-label">Hitung Fee</label>
      </div>
      <button className="btn btn-sm btn-primary" onClick={onClick}>
        Ubah Fee
      </button>
    </div>
  );
};
