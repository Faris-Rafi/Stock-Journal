import axios from "axios";

const api = axios.create({
  baseURL: "https://api.jurham.id/api",
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

export const addUser = async (regForm) => {
  try {
    const response = await api.post(`/register`, regForm);
    return response.data;
  } catch (error) {
    console.log(error);
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
      setErrors({ error: "Invalid Email or Password." });
    }
  }
};
