import React from "react";

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
      <label htmlFor={nameInput} className="form-label">
        {inputLabel}
      </label>
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
