import React, { useEffect, useState } from "react";
import Container from "../Layouts/container";
import { PageHeader } from "../Layouts/header";
import { GroupInput, InputCheck } from "../Components/InputForm/inputForm";
import Loading from "../Components/Loading/loading";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import { BuySellButton } from "../Components/Buttons/buttons";
import { avgTargetSell, onChangeValidation } from "../Utils/validations";
import { AvgChart } from "../Components/Charts/Charts";
import {
  AvgCard,
  JournalCard,
  ProfitCard,
  ResultAvgCard,
} from "../Components/Cards/Cards";
import {
  getAvgDetailData,
  getFeeTransaction,
  updateAvgData,
} from "../Services/api";
import {
  CreateAvgDetail,
  DeleteAVGDetailModal,
  EditAVGModal,
  EditCapitalAVGModal,
  FeeAVGModal,
} from "../Components/Modal/modals";

const DetailAVG = () => {
  const location = useLocation();
  const uuid = location.pathname.split("/").pop();
  const cookiesToken = Cookies.get("token");
  const [isLoading, setIsLoading] = useState(true);
  const [actionType, setActionType] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isFeeOpen, setIsFeeOpen] = useState(false);
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [isEditCapOpen, setIsEditCapOpen] = useState(false);
  const [isEditJourOpen, setIsEditJourOpen] = useState(false);
  const [avgDetail, setAvgDetail] = useState();
  const [fees, setFees] = useState();
  const [id, setId] = useState();
  const [errors, setErrors] = useState([""]);
  const [isValid, setIsValid] = useState(false);
  const [isChecked, setIsChecked] = useState();
  const [inputValues, setInputValues] = useState({
    target_sell: "",
  });

  let i = 1;
  let totalLot = 0;
  let totalValue = 0;
  let totalAmount = 0;
  let totalTransaction = 0;

  useEffect(() => {
    const fetchData = async () => {
      const avgDetail = await getAvgDetailData(uuid, cookiesToken);
      const fees = await getFeeTransaction();
      setAvgDetail(avgDetail);
      setFees(fees);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (avgDetail && avgDetail.target_sell) {
      setInputValues((prevInputValues) => ({
        ...prevInputValues,
        target_sell: avgDetail.target_sell,
      }));
    }
  }, [avgDetail]);

  useEffect(() => {
    if (avgDetail && avgDetail.is_fee_counting) {
      setIsChecked(avgDetail.is_fee_counting);
    }
  }, [avgDetail]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
    onChangeValidation({ name, value, setErrors });
  };

  const handleSubmit = () => {
    avgTargetSell({ inputValues, setErrors, setIsValid });
  };

  const handleCheckboxChange = (e) => {
    const newValue = e.target.checked ? "Y" : "N";
    setIsChecked(newValue);

    const fetchData = async () => {
      const updateJournal = await updateAvgData(avgDetail.id, cookiesToken, {
        is_fee_counting: newValue,
      });
      setAvgDetail(updateJournal);
    };

    fetchData();
  };

  useEffect(() => {
    if (!errors[0]) {
      setIsValid(false);
    }

    if (!errors[0] && isValid) {
      const fetchData = async () => {
        const updateJournal = await updateAvgData(
          avgDetail.id,
          cookiesToken,
          inputValues
        );
        setIsValid(false);
        setAvgDetail(updateJournal);
      };

      fetchData();
    }
  }, [errors, isValid]);

  if (isLoading) return <Loading />;

  return (
    <Container>
      <PageHeader navigateTo={"/select-avg"} />
      <JournalCard
        backgroundColor={"color__primary"}
        title={avgDetail.stock_name}
        notes={avgDetail.desc}
        buttonColor={"color__secondary text-white"}
        onClick={() => setIsEditJourOpen(true)}
      />
      <EditAVGModal
        Open={isEditJourOpen}
        onClose={() => setIsEditJourOpen(false)}
        id={avgDetail.id}
        setAvgDetail={setAvgDetail}
        cookiesToken={cookiesToken}
        stockName={avgDetail.stock_name}
        desc={avgDetail.desc}
      />
      <GroupInput
        inputLabel={"Target Jual"}
        nameInput={"target_sell"}
        value={inputValues.target_sell}
        targetSell={avgDetail.target_sell}
        error={errors[0]}
        onChange={handleInputChange}
        onClick={handleSubmit}
      />
      <InputCheck
        checked={isChecked == "Y"}
        onChange={handleCheckboxChange}
        onClick={() => setIsFeeOpen(true)}
      />
      <FeeAVGModal
        Open={isFeeOpen}
        onClose={() => setIsFeeOpen(false)}
        fees={fees}
        avgDetail={avgDetail}
        setAvgDetail={setAvgDetail}
        cookiesToken={cookiesToken}
      />
      <ProfitCard avgDetail={avgDetail} fees={fees} />
      <AvgChart avgDetail={avgDetail} />
      <ResultAvgCard
        avgDetail={avgDetail}
        fees={fees}
        onOpen={() => setIsEditCapOpen(true)}
      />
      <EditCapitalAVGModal
        id={avgDetail.id}
        Open={isEditCapOpen}
        onClose={() => setIsEditCapOpen(false)}
        cookiesToken={cookiesToken}
        setAvgDetail={setAvgDetail}
      />
      <hr />
      <BuySellButton setActionType={setActionType} setIsOpen={setIsOpen} />
      <CreateAvgDetail
        Open={isOpen}
        onClose={() => setIsOpen(false)}
        actionType={actionType}
        id={avgDetail.id}
        avgDetail={avgDetail}
        setAvgDetail={setAvgDetail}
        cookiesToken={cookiesToken}
      />
      {avgDetail.detail.map((detail, index) => {
        let totalAvg = 0;
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
          totalAmount -= parseInt(totalWithFee);
          totalLot -= parseInt(detail.lot);
          totalValue -= parseInt(detail.price);
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

          totalAmount += parseInt(totalWithFee);
          totalLot += parseInt(detail.lot);
          totalValue += parseInt(detail.price);
        }

        totalTransaction = totalAmount;
        totalAvg = (totalValue * totalLot) / totalLot;

        if (totalLot == 0) {
          totalAvg = 0;
        }

        const decimal = Math.max(
          0,
          Math.min(2, (totalAvg.toString().split(".")[1] || "").length)
        );

        return (
          <div key={index}>
            <AvgCard
              id={id}
              number={i++}
              price={detail.price}
              lot={detail.lot}
              actionType={detail.action_type}
              totalAvg={totalAvg.toFixed(decimal)}
              total={totalTransaction}
              onClick={() => {
                setIsDelOpen(true);
                setId(detail.id);
              }}
              avgDetail={avgDetail}
            />
            <DeleteAVGDetailModal
              id={id}
              cookiesToken={cookiesToken}
              onClose={() => setIsDelOpen(false)}
              Open={isDelOpen}
              setAvgDetail={setAvgDetail}
            />
          </div>
        );
      })}
    </Container>
  );
};

export default DetailAVG;
