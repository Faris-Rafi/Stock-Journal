import React, { useEffect, useState } from "react";
import { PageHeader } from "../Layouts/header";
import { PlainCard, TitleCard } from "../Components/Cards/Cards";
import Container from "../Layouts/container";
import { NumericInput, SelectInput } from "../Components/InputForm/inputForm";
import { getAraArbRules } from "../Services/api";
import Loading from "../Components/Loading/loading";
import { onChangeValidation, validationAraArb } from "../Utils/validations";
import { IconsBurg } from "../Components/PageIcons/icons";
import { ArabChart } from "../Components/Charts/Charts";
import { OptionModal } from "../Components/Modal/modals";
import {
  accelerationCalc,
  asymmetricCalc,
  symmetricCalc,
} from "../Utils/calculations";

const AraArb = () => {
  const [rules, setRules] = useState();
  const [isOpen, setIsOpen] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(["", "", ""]);
  const [resultData, setResultData] = useState();
  const [calculateForm, setCalculateForm] = useState({
    closingPrice: "",
    rule: 1,
    araCount: 2,
    arbCount: 5,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCalculateForm({ ...calculateForm, [name]: value });
    onChangeValidation({ name, value, setErrors });
  };

  useEffect(() => {
    const fetchData = async () => {
      const rules = await getAraArbRules();
      setRules(rules);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleSubmit = () => {
    validationAraArb({ calculateForm, setErrors });

    if (errors.every((error) => error === "")) {
      const ruleValue = calculateForm.rule;

      if (ruleValue == 1) {
        symmetricCalc({ calculateForm, setResultData });
      }

      if (ruleValue == 2 || ruleValue == 4) {
        rules.map((rule) => {
          if (ruleValue == rule.id) {
            asymmetricCalc({ calculateForm, setResultData, rule });
          }
        });
      }

      if (ruleValue == 3) {
        rules.map((rule) => {
          if (ruleValue == rule.id) {
            accelerationCalc({ calculateForm, setResultData, rule });
          }
        });
      }
    }
  };

  if (isLoading) return <Loading />;

  return (
    <Container>
      <PageHeader navigateTo={"/"} />
      <TitleCard
        backgroundColor={"color__primary"}
        title={"Kalkulasi ARA ARB"}
      />
      <NumericInput
        inputLabel={"Harga Penutupan"}
        nameInput={"closingPrice"}
        value={calculateForm.closingPrice}
        onChange={handleInputChange}
        error={errors[0]}
      />
      <SelectInput
        inputLabel={"Pilih peraturan"}
        nameInput={"rule"}
        value={calculateForm.rule}
        onChange={handleInputChange}
      >
        {rules.map((rule, index) => (
          <option key={index} value={rule.id}>
            {rule.name}
          </option>
        ))}
      </SelectInput>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-sm btn-primary mb-3"
          onClick={() => setIsOpen(true)}
        >
          Pengaturan ARA/ARB
        </button>
      </div>
      <button
        className="btn color__secondary text-white w-100 mb-3"
        onClick={handleSubmit}
      >
        Hitung
      </button>
      {resultData && (
        <>
          <ArabChart datas={resultData} />
          {resultData.araValues
            .slice()
            .reverse()
            .map((value, index) => {
              const percent =
                resultData.araPercents[
                  resultData.araPercents.length - index - 1
                ];
              if (value > 0 && percent > 0) {
                return (
                  <PlainCard bg={"my-2"} key={index}>
                    <IconsBurg
                      bg={"bg-success"}
                      icon={"bi bi-graph-up-arrow"}
                      className={"text-success"}
                      context={"Harga Ara"}
                      contextEnd={"Kenaikan"}
                      valueEnd={`${percent}%`}
                      value={value}
                    />
                  </PlainCard>
                );
              }
            })}
          <PlainCard bg={"my-2"}>
            <IconsBurg
              bg={"bg-secondary"}
              icon={"bi bi-cash"}
              context={"Harga Penutup "}
              value={resultData.closingPrice}
            />
          </PlainCard>
          {resultData.arbValues.map((value, index) => {
            const percent = resultData.arbPercents[index];

            if (value > 0) {
              return (
                <PlainCard bg={"my-2"} key={index}>
                  <IconsBurg
                    bg={"bg-danger"}
                    icon={"bi bi-graph-down-arrow"}
                    className={"text-danger"}
                    context={"Harga Arb"}
                    contextEnd={"Turun"}
                    value={value}
                    valueEnd={`${percent}%`}
                  />
                </PlainCard>
              );
            }
          })}
        </>
      )}
      <OptionModal
        Open={isOpen}
        onClose={() => setIsOpen(false)}
        calculateForm={calculateForm}
        setCalculateForm={setCalculateForm}
        errors={errors}
        setErrors={setErrors}
      />
    </Container>
  );
};

export default AraArb;
