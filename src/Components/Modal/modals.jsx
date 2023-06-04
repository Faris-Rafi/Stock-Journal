import React from "react";
import { NumericInput, SelectInput } from "../InputForm/inputForm";
import "./styles/modal.css";
import { onChangeValidation, validationAraArb } from "../../Utils/validations";

export const FeeModal = ({
  Open,
  onClose,
  fees,
  calculateForm,
  setCalculateForm,
  customFee,
  setCustomFee,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCalculateForm({ ...calculateForm, [name]: value });
  };

  const handleFeeChange = (e) => {
    const { name, value } = e.target;
    setCustomFee({ ...customFee, [name]: value });
  };

  if (!Open) return null;

  return (
    <>
      <div className="overlay" />
      <div className="modal-style">
        <div className="d-flex justify-content-between">
          <span className="fs-5">Ubah Fee</span>
          <span className="fs-5">
            <i
              className="bi bi-x-lg"
              style={{ cursor: "pointer" }}
              onClick={() => {
                calculateForm.fee = "1";
                onClose();
              }}
            ></i>
          </span>
        </div>
        <hr />
        <SelectInput
          inputLabel={"Fee"}
          nameInput={"fee"}
          value={calculateForm.fee}
          onChange={handleInputChange}
        >
          {fees.map((fee, index) => (
            <option key={index} value={fee.id}>
              Beli {fee.buy}%, Jual {fee.sell}%
            </option>
          ))}
          <option value="0">Custom</option>
        </SelectInput>
        {calculateForm.fee == 0 && (
          <div className="d-flex justify-content-between">
            <NumericInput
              inputLabel={"Fee Beli"}
              nameInput={"buy"}
              placeholder={"0.15"}
              onChange={handleFeeChange}
              value={customFee.buy}
            />
            <div className="px-2" />
            <NumericInput
              inputLabel={"Fee Jual"}
              nameInput={"sell"}
              placeholder={"0.25"}
              onChange={handleFeeChange}
              value={customFee.sell}
            />
          </div>
        )}
        <button
          className="btn color__secondary text-white w-100"
          onClick={onClose}
        >
          Simpan
        </button>
      </div>
    </>
  );
};

export const OptionModal = ({
  Open,
  onClose,
  calculateForm,
  setCalculateForm,
  errors,
  setErrors,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCalculateForm({ ...calculateForm, [name]: value });
    onChangeValidation({ name, value, setErrors });
  };

  const handleSubmit = () => {
    validationAraArb({ calculateForm, setErrors });

    if (errors.every((error) => error === "")) {
      onClose()
    }
  };

  if (!Open) return null;

  return (
    <>
      <div className="overlay" />
      <div className="modal-style">
        <div className="d-flex justify-content-between">
          <span className="fs-5">Ubah Fee</span>
          <span className="fs-5">
            <i
              className="bi bi-x-lg"
              style={{ cursor: "pointer" }}
              onClick={() => {
                calculateForm.araCount = 2;
                calculateForm.arbCount = 5;
                onClose();
              }}
            ></i>
          </span>
        </div>
        <hr />
        <div className="d-flex justify-content-between">
          <NumericInput
            inputLabel={"Jumlah ARA"}
            nameInput={"araCount"}
            placeholder={"maks. 10"}
            error={errors[1]}
            onChange={handleInputChange}
            value={calculateForm.araCount}
          />
          <div className="px-2" />
          <NumericInput
            inputLabel={"Jumlah ARB"}
            nameInput={"arbCount"}
            placeholder={"maks. 10"}
            error={errors[2]}
            onChange={handleInputChange}
            value={calculateForm.arbCount}
          />
        </div>
        <button
          className="btn color__secondary text-white w-100"
          onClick={handleSubmit}
        >
          Simpan
        </button>
      </div>
    </>
  );
};
