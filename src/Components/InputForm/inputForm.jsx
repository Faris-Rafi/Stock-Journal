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
        className={`form-control ${error && "is-invalid"}`}
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
}) => {
  return (
    <div className="form-group mt-3">
      <label className="form-label">
        {inputLabel}
      </label>
      <NumericFormat
        thousandSeparator={true}
        allowNegative={allowN}
        name={nameInput}
        className={`form-control shadow-sm ${error && "is-invalid"}`}
        value={value}
        onKeyDown={onKeyDown}
        onChange={onChange}
      />
      <p className="text-danger">{error}</p>
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
      <label className="form-label">
        {inputLabel}
      </label>
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
