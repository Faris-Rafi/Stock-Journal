import axios from "axios";

const api = axios.create({
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
