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
      name === "arbCount"
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
        } else {
          errorMessage[0] = "";
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

export const validation = ({ calculateForm, setErrors }) => {
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

    return errorMessage;
  });
};

export const validationAraArb = ({ calculateForm, setErrors }) => {
  const closingPrice = parseInt(calculateForm.closingPrice.replace(/,/g, ""));
  const araCount = parseInt(calculateForm.araCount.replace(/,/g, ""));
  const arbCount = parseInt(calculateForm.arbCount.replace(/,/g, ""));

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

    return errorMessage;
  });
};
