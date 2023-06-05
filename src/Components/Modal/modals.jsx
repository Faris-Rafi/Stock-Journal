import React, { useRef, useState } from "react";
import { Input, NumericInput, SelectInput } from "../InputForm/inputForm";
import "./styles/modal.css";
import {
  avgValidation,
  onChangeValidation,
  validationAraArb,
} from "../../Utils/validations";
import { addAvgData, deleteAvgData } from "../../Services/api";
import { NumericFormat } from "react-number-format";

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
      onClose();
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

export const AddAVGModal = ({
  Open,
  onClose,
  cookiesToken,
  setAvgJournals,
}) => {
  const buttonRef = useRef(null);
  const [errors, setErrors] = useState(["", ""]);
  const [form, setForm] = useState({
    stock_name: "",
    capital_limit: "",
    fee_transaction_id: "1",
    desc: "",
  });

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      buttonRef.current.click();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    avgValidation({ form, setErrors });

    if (form.stock_name && form.capital_limit) {
      const fetchData = async () => {
        const journalUpdate = await addAvgData(cookiesToken, form);
        setAvgJournals(journalUpdate);
        setForm("");
        onClose();
      };

      fetchData();
    }
  };

  if (!Open) return null;
  return (
    <>
      <div className="overlay" />
      <div>
        <div className="modal-style">
          <div className="d-flex justify-content-between">
            <span className="fs-5">Tambah Jurnal</span>
            <span className="fs-5">
              <i
                className="bi bi-x-lg"
                style={{ cursor: "pointer" }}
                onClick={onClose}
              ></i>
            </span>
          </div>
          <hr />
          <Input
            inputLabel={"Nama Saham"}
            typeInput={"text"}
            nameInput={"stock_name"}
            placeholder={"Masukkan nama saham"}
            error={errors[0]}
            value={form.stock_name}
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
          />
          <NumericInput
            inputLabel={"Modal"}
            nameInput={"capital_limit"}
            placeholder={"Masukkan modal anda"}
            error={errors[1]}
            onChange={handleInputChange}
            value={form.capital_limit}
          />
          <span className="text-secondary">*ketik 0 untuk tidak terbatas</span>
          <div className="form-group mt-3">
            <label htmlFor="desc" className="form-label">
              Catatan (opsional)
            </label>
            <textarea
              name="desc"
              id="desc"
              rows="4"
              className="form-control shadow-sm"
              placeholder="Masukkan catatan untuk pengingat"
              value={form.desc}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <button
            className="btn color__secondary text-white w-100 mt-4 mb-3"
            ref={buttonRef}
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export const DeleteAVGModal = ({
  dataId,
  dataName,
  onClose,
  setAvgJournals,
  cookiesToken,
  Open,
}) => {
  const handleDelete = () => {
    const fetchData = async () => {
      const journalUpdate = await deleteAvgData(cookiesToken, dataId);
      setAvgJournals(journalUpdate);
      onClose();
    };

    fetchData();
  };

  if (!Open) return null;

  return (
    <>
      <div className="overlay" />
      <div>
        <div className="modal-style">
          <div className="d-flex justify-content-between">
            <h5 className="text-danger">Confirm delete</h5>
            <span className="fs-5">
              <i
                className="bi bi-x-lg"
                style={{ cursor: "pointer" }}
                onClick={onClose}
              ></i>
            </span>
          </div>
          <hr />
          <h5 className="my-4 text-danger">
            Are you sure want to delete "{dataName}"?
          </h5>
          <hr />
          <div className="d-flex justify-content-end">
            <button className="btn btn-danger me-2" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
