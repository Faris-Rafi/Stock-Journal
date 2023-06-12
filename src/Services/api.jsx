import axios from "axios";

const api = axios.create({
  // baseURL: "https://api.jurham.id/api",
  baseURL: "http://127.0.0.1:8000/api",
});

export const fetchUser = async (cookiesToken) => {
  try {
    const response = await api.get(`/user`, {
      headers: { Authorization: `Bearer ${cookiesToken}` },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addUser = async ({ regForm, setErrors }) => {
  try {
    const response = await api.post(`/register`, regForm);
    return response.data;
  } catch (error) {
    if (error.response.status === 422) {
      setErrors(error.response.data.errors);
    }
  }
};

export const loginUser = async ({ logForm, setErrors }) => {
  try {
    const response = await api.post(`/login`, logForm);
    return response.data;
  } catch (error) {
    if (error.response.status === 422) {
      setErrors(error.response.data.errors);
    }
    if (error.response.status === 401) {
      setErrors({ error: "Email atau Password invalid." });
    }
  }
};

export const getFeeTransaction = async () => {
  try {
    const response = await api.get("/feeTransaction");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCustomFeeTransaction = async (cookiesToken) => {
  try {
    const response = await api.get("/custom-fee", {
      headers: { Authorization: `Bearer ${cookiesToken}` },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAraArbRules = async () => {
  try {
    const response = await api.get("/ara-arb-rules");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAvgData = async (cookiesToken) => {
  try {
    const response = await api.get("/averaging", {
      headers: { Authorization: `Bearer ${cookiesToken}` },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAvgData = async (cookiesToken, id) => {
  try {
    const response = await api.delete(`/averaging/${id}`, {
      headers: { Authorization: `Bearer ${cookiesToken}` },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const addAvgData = async (cookiesToken, form) => {
  try {
    const response = await api.post(`/averaging`, form, {
      headers: { Authorization: `Bearer ${cookiesToken}` },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateAvgData = async (id, cookiesToken, form) => {
  try {
    const response = await api.patch(`/averaging/${id}`, form, {
      headers: { Authorization: `Bearer ${cookiesToken}` },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAvgDetailData = async (uuid, cookiesToken) => {
  try {
    const response = await api.get(`averaging/${uuid}`, {
      headers: { Authorization: `Bearer ${cookiesToken}` },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const addAvgDetailData = async (id, cookiesToken, calculateForm) => {
  try {
    const response = await api.patch(`/average-detail/${id}`, calculateForm, {
      headers: { Authorization: `Bearer ${cookiesToken}` },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAvgDetailData = async (id, cookiesToken) => {
  try {
    const response = await api.delete(`/average-detail/${id}`, {
      headers: { Authorization: `Bearer ${cookiesToken}` },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const addCustomFee = async (cookiesToken, customForm) => {
  try {
    const response = await api.post(`/custom-fee`, customForm, {
      headers: { Authorization: `Bearer ${cookiesToken}` },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const editCustomFee = async (id, cookiesToken, customForm) => {
  try {
    const response = await api.post(`/custom-fee/${id}`, customForm, {
      headers: { Authorization: `Bearer ${cookiesToken}` },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
