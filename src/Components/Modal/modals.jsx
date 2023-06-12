import React, { useEffect, useRef, useState } from "react";
import { Input, NumericInput, SelectInput } from "../InputForm/inputForm";
import "./styles/modal.css";
import {
  avgDetailValidation,
  avgValidation,
  customFeeValidation,
  onChangeValidation,
  validationAraArb,
} from "../../Utils/validations";
import {
  addAvgData,
  addAvgDetailData,
  addCustomFee,
  deleteAvgData,
  deleteAvgDetailData,
  editCustomFee,
  updateAvgData,
} from "../../Services/api";
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
  const [errors, setErrors] = useState(["", ""]);
  const [isValid, setIsValid] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCalculateForm({ ...calculateForm, [name]: value });
  };

  const handleFeeChange = (e) => {
    const { name, value } = e.target;
    setCustomFee({ ...customFee, [name]: value });
  };

  const handleSubmit = () => {
    if (calculateForm.fee == 0) {
      customFeeValidation({ customFee, setErrors, setIsValid });
    } else {
      setIsValid(false);
      setErrors(["", ""]);
      onClose();
    }
  };

  useEffect(() => {
    if (isValid) {
      setIsValid(false);
      onClose();
    }
  }, [isValid]);

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
          <div className="d-flex justify-content-between mb-3">
            <NumericInput
              inputLabel={"Fee Beli"}
              nameInput={"buy"}
              placeholder={"0.15"}
              error={errors[0]}
              onChange={handleFeeChange}
              value={customFee.buy}
            />
            <div className="px-2" />
            <NumericInput
              inputLabel={"Fee Jual"}
              nameInput={"sell"}
              placeholder={"0.25"}
              error={errors[1]}
              onChange={handleFeeChange}
              value={customFee.sell}
            />
          </div>
        )}
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

export const FeeAVGModal = ({
  Open,
  onClose,
  fees,
  avgDetail,
  setAvgDetail,
  cookiesToken,
}) => {
  const [form, setForm] = useState({
    fee_transaction_id: avgDetail.fee_transaction_id,
  });

  let customBuy = "";
  let customSell = "";

  if (avgDetail.custom_fee.length != 0) {
    avgDetail.custom_fee.map((fee) => {
      customBuy = fee.buy;
      customSell = fee.sell;
    });
  }

  const [customFee, setCustomFee] = useState({
    avg_calculator_id: avgDetail.id,
    buy: customBuy,
    sell: customSell,
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFeeChange = (e) => {
    const { name, value } = e.target;
    setCustomFee({ ...customFee, [name]: value });
  };

  const handleSubmit = () => {
    console.log(avgDetail.custom_fee.length);
    if (form.fee_transaction_id != 0) {
      const fetchData = async () => {
        const journalUpdate = await updateAvgData(
          avgDetail.id,
          cookiesToken,
          form
        );
        setAvgDetail(journalUpdate);
        onClose();
      };

      fetchData();
    } else {
      if (avgDetail.custom_fee.length < 1) {
        const fetchData = async () => {
          const journalUpdate = await addCustomFee(cookiesToken, customFee);
          const journalUpdates = await updateAvgData(
            avgDetail.id,
            cookiesToken,
            form
          );
          setAvgDetail(journalUpdates);
          onClose();
        };

        fetchData();
      } else {
        const fetchData = async () => {
          const journalUpdate = await editCustomFee(
            avgDetail.id,
            cookiesToken,
            customFee
          );
          const journalUpdates = await updateAvgData(
            avgDetail.id,
            cookiesToken,
            form
          );
          setAvgDetail(journalUpdates);
          onClose();
        };

        fetchData();
      }
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
                onClose();
              }}
            ></i>
          </span>
        </div>
        <hr />
        <SelectInput
          inputLabel={"Fee"}
          nameInput={"fee_transaction_id"}
          value={form.fee_transaction_id}
          onChange={handleOnChange}
        >
          {fees.map((fee, index) => (
            <option key={index} value={fee.id}>
              Beli {fee.buy}%, Jual {fee.sell}%
            </option>
          ))}
          <option value="0">Custom</option>
        </SelectInput>
        {form.fee_transaction_id == 0 && (
          <div className="d-flex justify-content-between mb-3">
            <NumericInput
              inputLabel={"Fee Beli"}
              nameInput={"buy"}
              placeholder={"0.15"}
              value={customBuy}
              onChange={handleFeeChange}
            />
            <div className="px-2" />
            <NumericInput
              inputLabel={"Fee Jual"}
              nameInput={"sell"}
              placeholder={"0.25"}
              value={customSell}
              onChange={handleFeeChange}
            />
          </div>
        )}
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

export const OptionModal = ({
  Open,
  onClose,
  calculateForm,
  setCalculateForm,
  setIsValid,
}) => {
  const [errors, setErrors] = useState(["", "", ""]);
  const [isCountValid, setIsCountValid] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCalculateForm({ ...calculateForm, [name]: value });
    onChangeValidation({ name, value, setErrors });
  };

  const handleSubmit = () => {
    validationAraArb({ calculateForm, setErrors, setIsCountValid, setIsValid });
  };

  useEffect(() => {
    if (isCountValid) {
      setIsCountValid(false);
      onClose();
    }
  }, [isCountValid]);

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
                onClose();
              }}
            ></i>
          </span>
        </div>
        <hr />
        <div className="d-flex justify-content-between mb-3">
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
        setForm({
          stock_name: "",
          capital_limit: "",
          fee_transaction_id: "1",
          desc: "",
        });
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

export const EditAVGModal = ({
  Open,
  onClose,
  cookiesToken,
  setAvgDetail,
  stockName,
  desc,
  id,
}) => {
  const buttonRef = useRef(null);
  const [form, setForm] = useState({
    stock_name: stockName,
    desc: desc,
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
    const fetchData = async () => {
      const journalUpdate = await updateAvgData(id, cookiesToken, form);
      setAvgDetail(journalUpdate);
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
            <span className="fs-5">Edit Jurnal</span>
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
            value={form.stock_name}
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
          />
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

export const EditCapitalAVGModal = ({
  id,
  Open,
  onClose,
  cookiesToken,
  avgDetail,
  setAvgDetail,
}) => {
  const buttonRef = useRef(null);
  const [errors, setErrors] = useState(["", ""]);
  const [form, setForm] = useState({
    capital_limit: avgDetail.capital_limit,
  });

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      buttonRef.current.click();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name == "capital_limit") {
      if (value.replace(/,/g, "") > 100000000000000) {
        setForm({ capital_limit: "1,000,000,000,00000" });
      }

      if (value.includes(".")) {
        setForm({ capital_limit: value.replace(".", "") });
      }
    }
  };

  const handleSubmit = () => {
    if (form.capital_limit) {
      const fetchData = async () => {
        const journalUpdate = await updateAvgData(id, cookiesToken, form);
        setAvgDetail(journalUpdate);
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
            <span className="fs-5">Edit Modal</span>
            <span className="fs-5">
              <i
                className="bi bi-x-lg"
                style={{ cursor: "pointer" }}
                onClick={onClose}
              ></i>
            </span>
          </div>
          <hr />
          <NumericInput
            allowN={false}
            inputLabel={"Modal"}
            nameInput={"capital_limit"}
            placeholder={"Masukkan modal anda"}
            error={errors[0]}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            value={form.capital_limit}
          />
          <span className="text-secondary">*ketik 0 untuk tidak terbatas</span>
          <span className="text-secondary d-block">
            *limit 1,000,000,000,000
          </span>
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
  onClose,
  setAvgJournals,
  avgJournals,
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
            <h5 className="text-danger">Konfirmasi Hapus</h5>
            <span className="fs-5">
              <i
                className="bi bi-x-lg"
                style={{ cursor: "pointer" }}
                onClick={onClose}
              ></i>
            </span>
          </div>
          <hr />
          {avgJournals
            .filter((item) => item.id == dataId)
            .map((journal, index) => (
              <h5 className="my-4 text-danger" key={index}>
                Apa anda yakin ingin menghapus "{journal.stock_name}"?
              </h5>
            ))}
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

export const CreateAvgDetail = ({
  Open,
  onClose,
  id,
  actionType,
  setAvgDetail,
  cookiesToken,
  avgDetail,
}) => {
  const [errors, setErrors] = useState(["", "", ""]);
  const [isValid, setIsValid] = useState(false);
  const [calculateForm, setCalculateForm] = useState({
    price: "",
    lot: "",
    action_type: actionType,
  });
  const buttonRef = useRef(null);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      buttonRef.current.click();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCalculateForm({
      ...calculateForm,
      [name]: value,
      action_type: actionType,
    });
    onChangeValidation({ name, value, setErrors });
  };

  let totalPrice = 0;
  let totalLot = 0;

  avgDetail.detail.map((detail) => {
    totalPrice += parseInt(detail.price);
    totalLot += parseInt(detail.lot);

    if (detail.action_type != "b") {
      totalPrice -= parseInt(detail.price * 2);
      totalLot -= parseInt(detail.lot * 2);
    }
  });

  const handleSubmit = () => {
    avgDetailValidation({ calculateForm, setErrors, totalPrice, totalLot });
    setIsValid(true);
  };

  useEffect(() => {
    if (!errors[0] || !errors[2]) {
      setIsValid(false);
    }

    if (!errors[0] && !errors[2] && isValid) {
      const fetchData = async () => {
        const detailUpdate = await addAvgDetailData(
          id,
          cookiesToken,
          calculateForm
        );
        setAvgDetail(detailUpdate);
        setCalculateForm({
          price: "",
          lot: "",
          action_type: actionType,
        });
        setIsValid(false);
        setErrors(["", "", ""]);
        onClose();
      };

      fetchData();
    }
  }, [errors, isValid]);

  if (!Open) return null;
  return (
    <>
      <div className="overlay" />
      <div className="modal-style">
        <div className="d-flex justify-content-between">
          {actionType == "b" ? (
            <span className="fs-5">Beli Saham</span>
          ) : (
            <span className="fs-5">Jual Saham</span>
          )}
          <span className="fs-5">
            <i
              className="bi bi-x-lg"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setCalculateForm({
                  price: "",
                  lot: "",
                  action_type: actionType,
                });
                setErrors(["", "", ""]);
                setIsValid(false);
                onClose();
              }}
            ></i>
          </span>
        </div>
        <hr />
        <NumericInput
          inputLabel={actionType == "b" ? "Harga Beli" : "Harga Jual"}
          placeholder={
            actionType == "b" ? "Masukkan Harga Beli" : "Masukkan Harga Jual"
          }
          nameInput={"price"}
          value={calculateForm.price}
          error={errors[0]}
          onKeyDown={handleKeyPress}
          onChange={handleInputChange}
        />
        {actionType == "b" ? (
          ""
        ) : (
          <small className="text-secondary">
            * Total saham anda seharga :{" "}
            <NumericFormat
              thousandSeparator={true}
              allowNegative={false}
              displayType="text"
              prefix="Rp. "
              value={totalPrice}
            />
          </small>
        )}
        <NumericInput
          inputLabel={"Lot"}
          placeholder={"Masukkan Lot"}
          nameInput={"lot"}
          value={calculateForm.lot}
          error={errors[2]}
          onKeyDown={handleKeyPress}
          onChange={handleInputChange}
        />
        {actionType == "b" ? (
          ""
        ) : (
          <small className="text-secondary">
            * Total lot anda sebanyak :{" "}
            <NumericFormat
              thousandSeparator={true}
              allowNegative={false}
              displayType="text"
              value={totalLot}
            />
          </small>
        )}

        <button
          ref={buttonRef}
          onClick={handleSubmit}
          className="btn color__secondary text-white w-100 mt-4 mb-3"
        >
          Save
        </button>
      </div>
    </>
  );
};

export const DeleteAVGDetailModal = ({
  id,
  onClose,
  setAvgDetail,
  cookiesToken,
  Open,
}) => {
  const handleDelete = () => {
    const fetchData = async () => {
      const updateDetail = await deleteAvgDetailData(id, cookiesToken);
      setAvgDetail(updateDetail);
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
            <h5 className="text-danger">Konfirmasi Hapus</h5>
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
            Apa anda yakin ingin menghapus ini?
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

export const AlertCapitalModal = ({ Open, onClose }) => {
  if (!Open) return null;
  return (
    <>
      <div className="overlay" />
      <div>
        <div className="modal-style">
          <div className="d-flex justify-content-between">
            <h5 className="text-danger">Pemberitahuan</h5>
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
            Pembelian telah melebihi modal anda
          </h5>
          <hr />
          <div className="d-flex justify-content-end">
            <button className="btn btn-danger me-2" onClick={onClose}>
              Tutup
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
