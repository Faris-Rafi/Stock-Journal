import { percentage, roundCeil, roundFloor } from "./roundValue";

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
          purchase * lot + (customFee.buy / 100) * (purchase * lot)
        );
        const totalSelling = Math.round(
          selling * lot - (customFee.sell / 100) * (selling * lot)
        );
        const totalFee = Math.round(
          (customFee.buy / 100) * (purchase * lot) +
            (customFee.sell / 100) * (selling * lot)
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

export const symmetricCalc = ({ calculateForm, setResultData }) => {
  const closingPrice = parseInt(calculateForm.closingPrice.replace(/,/g, ""));
  const araValues = ["", "", "", "", "", "", "", "", "", ""];
  const arbValues = ["", "", "", "", "", "", "", "", "", ""];
  const araPercents = ["", "", "", "", "", "", "", "", "", ""];
  const arbPercents = ["", "", "", "", "", "", "", "", "", ""];

  let araCalc = roundFloor(
    (closingPrice * (100 + percentage(closingPrice))) / 100
  );
  let arbCalc = roundCeil(
    (closingPrice * (100 - percentage(closingPrice))) / 100
  );
  let araPercentCalc = ((araCalc - closingPrice) / closingPrice) * 100;
  let arbPercentCalc = ((closingPrice - arbCalc) / closingPrice) * 100;

  if (araCalc >= 200000 || arbCalc <= 50) {
    if (arbCalc <= 50) {
      araValues[0] = araCalc;
      araPercents[0] = Number(araPercentCalc.toFixed(2));

      for (let i = 1; i < calculateForm.araCount; i++) {
        let oldAraVal = 0;

        if (i === 1) {
          oldAraVal = araCalc;
        } else {
          oldAraVal = araValues[i - 1];
        }

        let newAraVal = roundFloor(
          (oldAraVal * (100 + percentage(oldAraVal))) / 100
        );
        araPercentCalc = ((newAraVal - oldAraVal) / oldAraVal) * 100;

        if (newAraVal <= 200000) {
          araValues[i] = newAraVal;
          araPercents[i] = Number(araPercentCalc.toFixed(2));
        }
      }
    }

    if (araCalc >= 200000) {
      arbValues[0] = arbCalc;
      arbPercents[0] = Number(arbPercentCalc.toFixed(2));

      for (let i = 1; i < calculateForm.arbCount; i++) {
        let oldArbVal = 0;

        if (i === 1) {
          oldArbVal = arbCalc;
        } else {
          oldArbVal = arbValues[i - 1];
        }

        let newArbVal = roundCeil(
          (oldArbVal * (100 - percentage(oldArbVal))) / 100
        );
        arbPercentCalc = ((oldArbVal - newArbVal) / oldArbVal) * 100;

        if (newArbVal >= 50) {
          arbValues[i] = newArbVal;
          arbPercents[i] = Number(arbPercentCalc.toFixed(2));
        }
      }
    }

    setResultData({
      araValues,
      arbValues,
      araPercents,
      arbPercents,
      closingPrice,
    });
  } else {
    araValues[0] = araCalc;
    araPercents[0] = Number(araPercentCalc.toFixed(2));

    for (let i = 1; i < calculateForm.araCount; i++) {
      let oldAraVal = 0;

      if (i === 1) {
        oldAraVal = araCalc;
      } else {
        oldAraVal = araValues[i - 1];
      }

      let newAraVal = roundFloor(
        (oldAraVal * (100 + percentage(oldAraVal))) / 100
      );
      araPercentCalc = ((newAraVal - oldAraVal) / oldAraVal) * 100;

      if (newAraVal <= 200000) {
        araValues[i] = newAraVal;
        araPercents[i] = Number(araPercentCalc.toFixed(2));
      }
    }

    arbValues[0] = arbCalc;
    arbPercents[0] = Number(arbPercentCalc.toFixed(2));

    for (let i = 1; i < calculateForm.arbCount; i++) {
      let oldArbVal = 0;

      if (i === 1) {
        oldArbVal = arbCalc;
      } else {
        oldArbVal = arbValues[i - 1];
      }

      let newArbVal = roundCeil(
        (oldArbVal * (100 - percentage(oldArbVal))) / 100
      );
      arbPercentCalc = ((oldArbVal - newArbVal) / oldArbVal) * 100;

      if (newArbVal >= 50) {
        arbValues[i] = newArbVal;
        arbPercents[i] = Number(arbPercentCalc.toFixed(2));
      }
    }

    setResultData({
      araValues,
      arbValues,
      araPercents,
      arbPercents,
      closingPrice,
    });
  }
};

export const asymmetricCalc = ({ calculateForm, setResultData, rule }) => {
  const closingPrice = parseInt(calculateForm.closingPrice.replace(/,/g, ""));
  const araValues = ["", "", "", "", "", "", "", "", "", ""];
  const arbValues = ["", "", "", "", "", "", "", "", "", ""];
  const araPercents = ["", "", "", "", "", "", "", "", "", ""];
  const arbPercents = ["", "", "", "", "", "", "", "", "", ""];

  let araCalc = roundFloor(
    (closingPrice * (100 + percentage(closingPrice))) / 100
  );
  let arbCalc = roundCeil((closingPrice * (100 - rule.arb_percentage)) / 100);
  let araPercentCalc = ((araCalc - closingPrice) / closingPrice) * 100;
  let arbPercentCalc = ((closingPrice - arbCalc) / closingPrice) * 100;

  if (araCalc >= 200000 || arbCalc <= 50) {
    if (arbCalc <= 50) {
      araValues[0] = araCalc;
      araPercents[0] = Number(araPercentCalc.toFixed(2));

      for (let i = 1; i < calculateForm.araCount; i++) {
        let oldAraVal = 0;

        if (i === 1) {
          oldAraVal = araCalc;
        } else {
          oldAraVal = araValues[i - 1];
        }

        let newAraVal = roundFloor(
          (oldAraVal * (100 + percentage(oldAraVal))) / 100
        );
        araPercentCalc = ((newAraVal - oldAraVal) / oldAraVal) * 100;

        if (newAraVal <= 200000) {
          araValues[i] = newAraVal;
          araPercents[i] = Number(araPercentCalc.toFixed(2));
        }
      }
    }

    if (araCalc >= 200000) {
      arbValues[0] = arbCalc;
      arbPercents[0] = Number(arbPercentCalc.toFixed(2));

      for (let i = 1; i < calculateForm.arbCount; i++) {
        let oldArbVal = 0;

        if (i === 1) {
          oldArbVal = arbCalc;
        } else {
          oldArbVal = arbValues[i - 1];
        }

        let newArbVal = roundCeil(
          (oldArbVal * (100 - rule.arb_percentage)) / 100
        );
        arbPercentCalc = ((oldArbVal - newArbVal) / oldArbVal) * 100;

        if (newArbVal >= 50) {
          arbValues[i] = newArbVal;
          arbPercents[i] = Number(arbPercentCalc.toFixed(2));
        }
      }
    }

    setResultData({
      araValues,
      arbValues,
      araPercents,
      arbPercents,
      closingPrice,
    });
  } else {
    araValues[0] = araCalc;
    araPercents[0] = Number(araPercentCalc.toFixed(2));

    for (let i = 1; i < calculateForm.araCount; i++) {
      let oldAraVal = 0;

      if (i === 1) {
        oldAraVal = araCalc;
      } else {
        oldAraVal = araValues[i - 1];
      }

      let newAraVal = roundFloor(
        (oldAraVal * (100 + percentage(oldAraVal))) / 100
      );
      araPercentCalc = ((newAraVal - oldAraVal) / oldAraVal) * 100;

      if (newAraVal <= 200000) {
        araValues[i] = newAraVal;
        araPercents[i] = Number(araPercentCalc.toFixed(2));
      }
    }

    arbValues[0] = arbCalc;
    arbPercents[0] = Number(arbPercentCalc.toFixed(2));

    for (let i = 1; i < calculateForm.arbCount; i++) {
      let oldArbVal = 0;

      if (i === 1) {
        oldArbVal = arbCalc;
      } else {
        oldArbVal = arbValues[i - 1];
      }

      let newArbVal = roundCeil(
        (oldArbVal * (100 - rule.arb_percentage)) / 100
      );
      arbPercentCalc = ((oldArbVal - newArbVal) / oldArbVal) * 100;

      if (newArbVal >= 50) {
        arbValues[i] = newArbVal;
        arbPercents[i] = Number(arbPercentCalc.toFixed(2));
      }
    }

    setResultData({
      araValues,
      arbValues,
      araPercents,
      arbPercents,
      closingPrice,
    });
  }
};

export const accelerationCalc = ({ calculateForm, setResultData, rule }) => {
  const closingPrice = parseInt(calculateForm.closingPrice.replace(/,/g, ""));
  const araValues = ["", "", "", "", "", "", "", "", "", ""];
  const arbValues = ["", "", "", "", "", "", "", "", "", ""];
  const araPercents = ["", "", "", "", "", "", "", "", "", ""];
  const arbPercents = ["", "", "", "", "", "", "", "", "", ""];

  let araCalc = roundFloor(
    (closingPrice * (100 + parseInt(rule.ara_percentage))) / 100
  );
  let arbCalc = roundCeil(
    (closingPrice * (100 - parseInt(rule.arb_percentage))) / 100
  );
  let araPercentCalc = ((araCalc - closingPrice) / closingPrice) * 100;
  let arbPercentCalc = ((closingPrice - arbCalc) / closingPrice) * 100;

  if (araCalc >= 200000 || arbCalc <= 50) {
    if (arbCalc <= 50) {
      araValues[0] = araCalc;
      araPercents[0] = Number(araPercentCalc.toFixed(2));

      for (let i = 1; i < calculateForm.araCount; i++) {
        let oldAraVal = 0;

        if (i === 1) {
          oldAraVal = araCalc;
        } else {
          oldAraVal = araValues[i - 1];
        }

        let newAraVal = roundFloor(
          (oldAraVal * (100 + parseInt(rule.ara_percentage))) / 100
        );
        araPercentCalc = ((newAraVal - oldAraVal) / oldAraVal) * 100;

        if (newAraVal <= 200000) {
          araValues[i] = newAraVal;
          araPercents[i] = Number(araPercentCalc.toFixed(2));
        }
      }
    }

    if (araCalc >= 200000) {
      arbValues[0] = arbCalc;
      arbPercents[0] = Number(arbPercentCalc.toFixed(2));

      for (let i = 1; i < calculateForm.arbCount; i++) {
        let oldArbVal = 0;

        if (i === 1) {
          oldArbVal = arbCalc;
        } else {
          oldArbVal = arbValues[i - 1];
        }

        let newArbVal = roundCeil(
          (oldArbVal * (100 - parseInt(rule.arb_percentage))) / 100
        );
        arbPercentCalc = ((oldArbVal - newArbVal) / oldArbVal) * 100;

        if (newArbVal >= 50) {
          arbValues[i] = newArbVal;
          arbPercents[i] = Number(arbPercentCalc.toFixed(2));
        }
      }
    }

    setResultData({
      araValues,
      arbValues,
      araPercents,
      arbPercents,
      closingPrice,
    });
  } else {
    araValues[0] = araCalc;
    araPercents[0] = Number(araPercentCalc.toFixed(2));

    for (let i = 1; i < calculateForm.araCount; i++) {
      let oldAraVal = 0;

      if (i === 1) {
        oldAraVal = araCalc;
      } else {
        oldAraVal = araValues[i - 1];
      }

      let newAraVal = roundFloor(
        (oldAraVal * (100 + parseInt(rule.ara_percentage))) / 100
      );
      araPercentCalc = ((newAraVal - oldAraVal) / oldAraVal) * 100;

      if (newAraVal <= 200000) {
        araValues[i] = newAraVal;
        araPercents[i] = Number(araPercentCalc.toFixed(2));
      }
    }

    arbValues[0] = arbCalc;
    arbPercents[0] = Number(arbPercentCalc.toFixed(2));

    for (let i = 1; i < calculateForm.arbCount; i++) {
      let oldArbVal = 0;

      if (i === 1) {
        oldArbVal = arbCalc;
      } else {
        oldArbVal = arbValues[i - 1];
      }

      let newArbVal = roundCeil(
        (oldArbVal * (100 - parseInt(rule.arb_percentage))) / 100
      );
      arbPercentCalc = ((oldArbVal - newArbVal) / oldArbVal) * 100;

      if (newArbVal >= 50) {
        arbValues[i] = newArbVal;
        arbPercents[i] = Number(arbPercentCalc.toFixed(2));
      }
    }

    setResultData({
      araValues,
      arbValues,
      araPercents,
      arbPercents,
      closingPrice,
    });
  }
};
