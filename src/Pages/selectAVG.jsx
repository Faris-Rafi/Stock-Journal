import React, { useEffect, useState } from "react";
import Container from "../Layouts/container";
import { PageHeader } from "../Layouts/header";
import { SelectCard, TitleCard } from "../Components/Cards/Cards";
import Cookies from "js-cookie";
import { getAvgData, getFeeTransaction } from "../Services/api";
import Loading from "../Components/Loading/loading";
import { AddAVGModal, DeleteAVGModal } from "../Components/Modal/modals";

const SelectAVG = () => {
  const cookiesToken = Cookies.get("token");
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [id, setId] = useState();
  const [avgJournals, setAvgJournals] = useState();
  const [fees, setFees] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const avgData = await getAvgData(cookiesToken);
      const fees = await getFeeTransaction();
      setAvgJournals(avgData);
      setFees(fees);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <Container>
      <PageHeader navigateTo={"/"} />
      <TitleCard backgroundColor={"color__primary"} title={"Jurnal AVG"} />
      <button
        className="w-100 btn color__secondary text-white mt-3"
        onClick={() => setIsAddOpen(true)}
      >
        Tambah Jurnal +
      </button>
      {avgJournals.map((journal, index) => {
        let totalPrice = 0;
        let totalLot = 0;
        let totalPurchase = 0;
        let totalAvg = 0;
        let totalProfit = 0;

        journal.detail
          .filter((item) => item.avg_calculator_id == journal.id)
          .map((detail) => {
            let purchased = 0;

            if (detail.action_type != "b") {
              if (journal.is_fee_counting == "Y") {
                if (journal.fee_transaction_id != 0) {
                  fees
                    .filter((item) => item.id == journal.fee_transaction_id)
                    .map((fee) => {
                      purchased = Math.round(
                        parseInt(
                          detail.price * (detail.lot * 100) -
                            (fee.sell / 100) *
                              (detail.price * (detail.lot * 100))
                        )
                      );
                    });
                } else {
                  journal.custom_fee.map((fee) => {
                    purchased = parseInt(
                      detail.price * (detail.lot * 100) -
                        (fee.sell / 100) * (detail.price * (detail.lot * 100))
                    );
                  });
                }
              } else {
                purchased = detail.price * (detail.lot * 100);
              }

              totalPrice -= parseInt(detail.price);
              totalLot -= parseInt(detail.lot);
              totalPurchase -= parseInt(purchased);
            } else {
              if (journal.is_fee_counting == "Y") {
                if (journal.fee_transaction_id != 0) {
                  fees
                    .filter((item) => item.id == journal.fee_transaction_id)
                    .map((fee) => {
                      purchased = Math.round(
                        parseInt(
                          detail.price * (detail.lot * 100) +
                            (fee.buy / 100) *
                              (detail.price * (detail.lot * 100))
                        )
                      );
                    });
                } else {
                  journal.custom_fee.map((fee) => {
                    purchased = parseInt(
                      detail.price * (detail.lot * 100) +
                        (fee.buy / 100) * (detail.price * (detail.lot * 100))
                    );
                  });
                }
              } else {
                purchased = detail.price * (detail.lot * 100);
              }
              totalPrice += parseInt(detail.price);
              totalLot += parseInt(detail.lot);
              totalPurchase += parseInt(purchased);
            }
          });

        if (totalLot > 0) {
          totalAvg = (totalPrice * totalLot) / totalLot;
          let targetSell = 0;

          if (journal.is_fee_counting == "Y") {
            if (journal.fee_transaction_id != 0) {
              fees
                .filter((item) => item.id == journal.fee_transaction_id)
                .map((fee) => {
                  targetSell = Math.round(
                    journal.target_sell * (totalLot * 100) -
                      (fee.sell / 100) *
                        (journal.target_sell * (totalLot * 100))
                  );
                });
            } else {
              journal.custom_fee.map((fee) => {
                targetSell = parseInt(
                  journal.target_sell * (totalLot * 100) -
                    (fee.sell / 100) * (journal.target_sell * (totalLot * 100))
                );
              });
            }
          } else {
            targetSell = journal.target_sell * (totalLot * 100);
          }

          totalProfit = targetSell - totalPurchase;
        }

        const decimal = Math.max(
          0,
          Math.min(2, (totalAvg.toString().split(".")[1] || "").length)
        );

        return (
          <div key={index}>
            <SelectCard
              title={journal.stock_name}
              price={totalAvg.toFixed(decimal)}
              lot={totalLot}
              totalData={journal.detail.length}
              targetSell={journal.target_sell}
              profit={totalProfit}
              profitColor={totalProfit < 0 ? "text-danger" : "text-success"}
              delOnClick={() => {
                setIsDeleteOpen(true);
                setId(journal.id);
              }}
              navigateTo={`/detail-avg/${journal.uuid}`}
            />
            <DeleteAVGModal
              dataId={id}
              dataName={journal.stock_name}
              onClose={() => setIsDeleteOpen(false)}
              avgJournals={avgJournals}
              setAvgJournals={setAvgJournals}
              cookiesToken={cookiesToken}
              Open={isDeleteOpen}
            />
          </div>
        );
      })}
      <AddAVGModal
        avgJournals={avgJournals}
        setAvgJournals={setAvgJournals}
        Open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        cookiesToken={cookiesToken}
      />
    </Container>
  );
};

export default SelectAVG;
