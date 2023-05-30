import React, { useEffect, useState } from "react";
import { PageHeader } from "../Layouts/header";
import { NumericInput } from "../Components/InputForm/inputForm";
import { getFeeTransaction } from "../Services/api";
import Loading from "../Components/Loading/loading";
import { onChangeValidation, validation } from "../Utils/validations";
import { PlainCard, TitleCard } from "../Components/Cards/Cards";
import { IconsBetween } from "../Components/PageIcons/icons";
import { FeeModal } from "../Components/Modal/modals";
import { calculation } from "../Utils/calculations";
import Container from "../Layouts/container";

const StockCalculator = () => {
  const [fees, setFees] = useState();
  const [isOpen, setIsOpen] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [resultData, setResultData] = useState();
  const [isChecked, setIsChecked] = useState("Y");
  const [errors, setErrors] = useState(["", "", "", ""]);
  const [customFee, setCustomFee] = useState({
    buy: "",
    sell: "",
  });
  const [calculateForm, setCalculateForm] = useState({
    purchase: "",
    selling: "",
    lot: "",
    fee: "1",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCalculateForm({ ...calculateForm, [name]: value });
    onChangeValidation({ name, value, setErrors });
  };

  const handleCheckboxChange = (e) => {
    const newValue = e.target.checked ? "Y" : "N";
    setIsChecked(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      const fees = await getFeeTransaction();
      setFees(fees);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleSubmit = () => {
    validation({ calculateForm, setErrors });

    if (errors.every((error) => error === "")) {
      calculation({ calculateForm, fees, setResultData, isChecked, customFee });
    }
  };

  if (isLoading) return <Loading />;

  return (
    <Container>
      <PageHeader navigateTo={"/"} />
      <TitleCard
        backgroundColor={"color__primary"}
        title={"Kalkulator Saham"}
      />
      <NumericInput
        inputLabel={"Harga Beli"}
        allowN={false}
        nameInput={"purchase"}
        value={calculateForm.purchase}
        onChange={handleInputChange}
        error={errors[0]}
      />
      <NumericInput
        inputLabel={"Lot"}
        allowN={false}
        nameInput={"lot"}
        value={calculateForm.lot}
        onChange={handleInputChange}
        error={errors[2]}
      />
      <NumericInput
        inputLabel={"Harga Jual"}
        allowN={false}
        nameInput={"selling"}
        value={calculateForm.selling}
        onChange={handleInputChange}
        error={errors[1]}
      />
      <div className="d-flex justify-content-between align-items-center mx-2">
        <div className="form-check">
          <input
            className="form-check-input shadow-sm"
            type="checkbox"
            checked={isChecked == "Y"}
            id="count_fee"
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label">Hitung Fee</label>
        </div>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => setIsOpen(true)}
        >
          Ubah Fee
        </button>
      </div>
      <button
        className="btn color__secondary text-white w-100 mt-4 mb-3"
        onClick={handleSubmit}
      >
        Hitung
      </button>
      {resultData && (
        <PlainCard>
          <IconsBetween
            bg={"bg-secondary"}
            icon={"bi bi-cash"}
            context={"Total Beli :"}
            value={resultData.totalPurchase}
          />
          <IconsBetween
            bg={"bg-primary"}
            icon={"bi bi-cash-coin"}
            context={"Total Jual :"}
            value={resultData.totalSelling}
          />
          <IconsBetween
            bg={"bg-success"}
            icon={"bi bi-receipt"}
            context={"Total Diterima :"}
            value={resultData.profitLoss}
          />
        </PlainCard>
      )}
      <FeeModal
        Open={isOpen}
        onClose={() => setIsOpen(false)}
        fees={fees}
        calculateForm={calculateForm}
        setCalculateForm={setCalculateForm}
        customFee={customFee}
        setCustomFee={setCustomFee}
      />
    </Container>
  );
};

export default StockCalculator;
