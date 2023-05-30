export const calculation = ({
  calculateForm,
  fees,
  setResultData,
  isChecked,
  customFee,
}) => {
  const purchase = parseInt(calculateForm.purchase.replace(/,/g, ""));
  const selling = parseInt(calculateForm.selling.replace(/,/g, ""));
  const lot = parseInt(calculateForm.lot.replace(/,/g, "") * 100);

  if (isChecked == "Y") {
    fees.map((fee) => {
      if (calculateForm.fee == 0) {
        const totalPurchase = Math.round(
          purchase * lot + (parseInt(customFee.buy) / 100) * (purchase * lot)
        );
        const totalSelling = Math.round(
          selling * lot - (parseInt(customFee.sell) / 100) * (selling * lot)
        );
        const totalFee = Math.round(
          (parseInt(customFee.buy) / 100) * (purchase * lot) +
            (parseInt(customFee.sell) / 100) * (selling * lot)
        );
        const profitLoss = selling * lot - purchase * lot - totalFee;

        setResultData({
          totalPurchase,
          totalSelling,
          profitLoss,
        });
      }
      if (calculateForm.fee == fee.id) {
        const totalPurchase = Math.round(
          purchase * lot + (fee.buy / 100) * (purchase * lot)
        );
        const totalSelling = Math.round(
          selling * lot - (fee.sell / 100) * (selling * lot)
        );
        const totalFee = Math.round(
          (fee.buy / 100) * (purchase * lot) +
            (fee.sell / 100) * (selling * lot)
        );
        const profitLoss = selling * lot - purchase * lot - totalFee;

        setResultData({
          totalPurchase,
          totalSelling,
          profitLoss,
        });
      }
    });
  } else {
    const totalPurchase = Math.round(purchase * lot);
    const totalSelling = Math.round(selling * lot);
    const profitLoss = selling * lot - purchase * lot;

    setResultData({
      totalPurchase,
      totalSelling,
      profitLoss,
    });
  }
};
