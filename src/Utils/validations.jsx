import { roundCeil, roundFloor } from "./roundValue";

export const onChangeValidation = ({ name, value, setErrors }) => {
  setErrors((prevErrors) => {
    const errorMessage = [...prevErrors];

    if (
      name === "purchase" ||
      name === "selling" ||
      name === "closingPrice" ||
      name === "lot" ||
      name === "fee" ||
      name === "araCount" ||
      name === "arbCount" ||
      name === "price" ||
      name === "target_sell"
    ) {
      if (name === "purchase") {
        const values = value.replace(/,/g, "");
        if (values > 200000) {
          errorMessage[0] = "Harga beli tidak boleh lebih dari 200.000.";
        } else {
          errorMessage[0] = "";
        }

        if (values <= 200000) {
          if (values != roundFloor(values)) {
            errorMessage[0] = `Harga tidak tersedia, pakai ${roundFloor(
              values
            )} atau ${roundCeil(values)}`;
          } else {
            errorMessage[0] = "";
          }
        }
      }

      if (name === "selling") {
        const values = value.replace(/,/g, "");
        if (values > 200000) {
          errorMessage[1] = "Harga jual tidak boleh lebih dari 200.000.";
        } else {
          errorMessage[1] = "";
        }

        if (values <= 200000) {
          if (values != roundFloor(values)) {
            errorMessage[1] = `Harga tidak tersedia, pakai ${roundFloor(
              values
            )} atau ${roundCeil(values)}`;
          } else {
            errorMessage[1] = "";
          }
        }
      }

      if (name === "closingPrice") {
        const values = parseInt(value.replace(/,/g, ""));

        if (values <= 200000) {
          if (values != roundFloor(values)) {
            errorMessage[0] = `Harga tidak tersedia, pakai ${roundFloor(
              values
            )} atau ${roundCeil(values)}`;
          } else {
            errorMessage[0] = "";
          }
        }

        if (values < 50) {
          errorMessage[0] = "Harga penutup tidak boleh kurang dari 50.";
        } else if (values > 200000) {
          errorMessage[0] = "Harga penutup tidak boleh lebih dari 200.000.";
        }
      }

      if (name === "price") {
        const values = parseInt(value.replace(/,/g, ""));

        if (values > 200000) {
          errorMessage[0] = "Harga beli tidak boleh lebih dari 200.000.";
        } else {
          errorMessage[0] = "";
        }

        if (values <= 200000) {
          if (values != roundFloor(values)) {
            errorMessage[0] = `Harga tidak tersedia, pakai ${roundFloor(
              values
            )} atau ${roundCeil(values)}`;
          } else {
            errorMessage[0] = "";
          }
        }
      }

      if (name === "target_sell") {
        const values = parseInt(value.replace(/,/g, ""));

        if (values > 200000) {
          errorMessage[0] = "Harga beli tidak boleh lebih dari 200.000.";
        } else {
          errorMessage[0] = "";
        }

        if (values <= 200000) {
          if (values != roundFloor(values)) {
            errorMessage[0] = `Harga tidak tersedia, pakai ${roundFloor(
              values
            )} atau ${roundCeil(values)}`;
          } else {
            errorMessage[0] = "";
          }
        }
      }

      if (name === "araCount") {
        const values = parseInt(value.replace(/,/g, ""));

        if (values > 10) {
          errorMessage[1] = "Jumlah ARA tidak boleh lebih dari 10.";
        } else {
          errorMessage[1] = "";
        }
      }

      if (name === "arbCount") {
        const values = parseInt(value.replace(/,/g, ""));

        if (values > 10) {
          errorMessage[2] = "Jumlah ARB tidak boleh lebih dari 10.";
        } else {
          errorMessage[2] = "";
        }
      }

      if (name === "lot") {
        if (value) {
          errorMessage[2] = "";
        }
      }

      if (name === "fee") {
        if (value) {
          errorMessage[3] = "";
        }
      }
    }

    return errorMessage;
  });
};

export const validation = ({ calculateForm, setErrors, setIsValid }) => {
  const purchaseValue = parseInt(calculateForm.purchase.replace(/,/g, ""));
  const sellValue = parseInt(calculateForm.selling.replace(/,/g, ""));
  const lotValue = parseInt(calculateForm.lot.replace(/,/g, ""));
  const feeValue = calculateForm.fee;

  setErrors((prevErrors) => {
    const errorMessage = [...prevErrors];

    if (!purchaseValue || !sellValue || !lotValue || !feeValue) {
      if (!purchaseValue) {
        errorMessage[0] = "Harga beli wajib diisi.";
      }

      if (!sellValue) {
        errorMessage[1] = "Harga jual wajib diisi.";
      }

      if (!lotValue) {
        errorMessage[2] = "Lot wajib diisi.";
      }

      if (!feeValue) {
        errorMessage[3] = "Biaya transaksi wajib diisi.";
      }
    }

    if (purchaseValue > 200000) {
      errorMessage[0] = "Harga beli tidak boleh lebih dari 200.000.";
    }

    if (sellValue > 200000) {
      errorMessage[1] = "Harga jual tidak boleh lebih dari 200.000.";
    }

    if (purchaseValue < 200001) {
      if (purchaseValue != roundFloor(purchaseValue)) {
        errorMessage[0] = `Harga tidak tersedia, pakai ${roundFloor(
          purchaseValue
        )} atau ${roundCeil(purchaseValue)}`;
      }
    }

    if (sellValue < 200001) {
      if (sellValue != roundFloor(sellValue)) {
        errorMessage[1] = `Harga tidak tersedia, pakai ${roundFloor(
          sellValue
        )} atau ${roundCeil(sellValue)}`;
      }
    }

    if (
      !errorMessage[0] &&
      !errorMessage[1] &&
      !errorMessage[2] &&
      !errorMessage[3]
    ) {
      setIsValid(true);
    }

    return errorMessage;
  });
};

export const customFeeValidation = ({ customFee, setErrors, setIsValid }) => {
  setErrors((prevErrors) => {
    const errorMessage = [...prevErrors];

    if (!customFee.buy) {
      errorMessage[0] = "Fee beli wajib diisi";
    } else {
      errorMessage[0] = "";
    }

    if (!customFee.sell) {
      errorMessage[1] = "Fee jual wajib diisi";
    } else {
      errorMessage[1] = "";
    }

    if (!errorMessage[0] && !errorMessage[1]) {
      setIsValid(true);
    }

    return errorMessage;
  });
};

export const validationAraArb = ({
  calculateForm,
  setErrors,
  setIsValid,
  setIsCountValid,
}) => {
  const closingPrice = parseInt(calculateForm.closingPrice.replace(/,/g, ""));
  const araCount = parseInt(calculateForm.araCount);
  const arbCount = parseInt(calculateForm.arbCount);

  setErrors((prevErrors) => {
    const errorMessage = [...prevErrors];

    if (!closingPrice || !araCount || !arbCount) {
      if (!closingPrice) errorMessage[0] = "Harga penutup wajib diisi.";
      if (!araCount) errorMessage[1] = "Jumlah ARA wajib diisi.";
      if (!arbCount) errorMessage[2] = "Jumlah ARB wajib diisi.";
    }

    if (araCount > 10) {
      errorMessage[1] = "Jumlah ARA tidak boleh lebih dari 10.";
    }

    if (arbCount > 10) {
      errorMessage[2] = "Jumlah ARB tidak boleh lebih dari 10.";
    }

    if (closingPrice > 200000) {
      errorMessage[0] = "Harga penutup tidak boleh lebih dari 200.000.";
    }

    if (closingPrice < 50) {
      errorMessage[0] = "Harga penutup tidak boleh kurang dari 50.";
    }

    if (closingPrice < 200001) {
      if (closingPrice != roundFloor(closingPrice)) {
        errorMessage[0] = `Harga tidak tersedia, pakai ${roundFloor(
          closingPrice
        )} atau ${roundCeil(closingPrice)}`;
      }
    }

    if (!errorMessage[0]) {
      setIsValid(true);
    }

    if (setIsCountValid && !errorMessage[1] && !errorMessage[2]) {
      setIsCountValid(true);
    }

    return errorMessage;
  });
};

export const avgValidation = ({ form, setErrors }) => {
  setErrors((prevErrors) => {
    const errorMessage = [...prevErrors];

    if (!form.stock_name || !form.capital_limit || !form.target_sell) {
      if (!form.stock_name) {
        errorMessage[0] = "Nama saham wajib diisi.";
      } else {
        errorMessage[0] = "";
      }

      if (!form.capital_limit) {
        errorMessage[1] = "Modal wajib diisi.";
      } else {
        errorMessage[1] = "";
      }
    }

    return errorMessage;
  });
};

export const avgTargetSell = ({ inputValues, setErrors, setIsValid }) => {
  const targetSell = parseInt(inputValues.target_sell.replace(/,/g, ""));
  setErrors((prevErrors) => {
    const errorMessage = [...prevErrors];

    if (!targetSell) {
      errorMessage[0] = "Target jual wajib diisi.";
    }

    if (targetSell <= 200000) {
      if (targetSell != roundFloor(targetSell)) {
        errorMessage[0] = `Harga tidak tersedia, pakai ${roundFloor(
          targetSell
        )} atau ${roundCeil(targetSell)}`;
      }
    }

    if (targetSell > 200000) {
      errorMessage[0] = "Harga beli tidak boleh lebih dari 200.000.";
    }

    if (!errorMessage[0]) setIsValid(true);
    return errorMessage;
  });
};

export const avgDetailValidation = ({
  calculateForm,
  setErrors,
  totalPrice,
  totalLot,
}) => {
  const priceValue = parseInt(calculateForm.price.replace(/,/g, ""));
  const lotValue = parseInt(calculateForm.lot.replace(/,/g, ""));
  const actionType = calculateForm.action_type;

  setErrors((prevErrors) => {
    const errorMessage = [...prevErrors];

    if (!priceValue) {
      errorMessage[0] = "Harga beli wajib diisi.";
    }

    if (!lotValue) {
      errorMessage[2] = "Lot wajib diisi.";
    }

    if (actionType != "b") {
      if (priceValue > totalPrice) {
        errorMessage[0] = "Harga Jual tidak boleh lebih dari total saham anda.";
      }

      if (lotValue > totalLot) {
        errorMessage[2] = "Jumlah Lot tidak boleh lebih dari total lot anda.";
      }
    }

    if (priceValue > 200000) {
      errorMessage[0] = "Harga beli tidak boleh lebih dari 200.000.";
    }

    if (priceValue < 200001) {
      if (priceValue != roundFloor(priceValue)) {
        errorMessage[0] = `Harga tidak tersedia, pakai ${roundFloor(
          priceValue
        )} atau ${roundCeil(priceValue)}`;
      }
    }

    return errorMessage;
  });
};
