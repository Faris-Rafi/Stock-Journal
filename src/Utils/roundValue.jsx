export const roundFloor = (price) => {
  if (price < 200) {
    return Math.floor(price);
  } else if (price < 500) {
    return Math.floor(price / 2) * 2;
  } else if (price < 2000) {
    return Math.floor(price / 5) * 5;
  } else if (price < 5000) {
    return Math.floor(price / 10) * 10;
  } else {
    return Math.floor(price / 25) * 25;
  }
};

export const roundCeil = (price) => {
  if (price < 200) {
    return Math.ceil(price);
  } else if (price < 500) {
    return Math.ceil(price / 2) * 2;
  } else if (price < 2000) {
    return Math.ceil(price / 5) * 5;
  } else if (price < 5000) {
    return Math.ceil(price / 10) * 10;
  } else {
    return Math.ceil(price / 25) * 25;
  }
};
