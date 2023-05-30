import React, { useEffect, useRef, useState } from "react";
import { Input } from "../Components/InputForm/inputForm";
import { loginUser } from "../Services/api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../Layouts/header";
import Container from "../Layouts/container";

const Login = () => {
  const cookiesToken = Cookies.get("token");
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const [logForm, setLogForm] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLogForm({ ...logForm, [name]: value });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      buttonRef.current.click();
    }
  };

  const handleSubmit = () => {
    const fetchData = async () => {
      const user = await loginUser({ logForm, setErrors });
      Cookies.set("token", user.token, { expires: 2 });
      navigate("/");
    };

    fetchData();
  };

  useEffect(() => {
    if (cookiesToken) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Container>
      <PageHeader navigateTo={"/"} />
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="d-flex flex-column justify-content-center align-items-center p-2 mb-3">
              <h3 className="mt-2">Login</h3>
            </div>
            <p className="text-danger">{errors.error}</p>
            <Input
              inputLabel={"Alamat email"}
              typeInput={"email"}
              nameInput={"email"}
              placeholder={"Masukkan alamat email anda"}
              value={logForm.email}
              onKeyDown={handleKeyPress}
              onChange={handleInputChange}
              error={errors.email}
            />
            <Input
              inputLabel={"Password"}
              typeInput={"password"}
              nameInput={"password"}
              placeholder={"Masukkan password anda"}
              value={logForm.password}
              onKeyDown={handleKeyPress}
              onChange={handleInputChange}
              error={errors.password}
            />
            <button
              className="btn shadow color__secondary text-white w-100"
              ref={buttonRef}
              onClick={handleSubmit}
            >
              Login
            </button>
            <p className="text-center mt-3">
              Tidak mempunyai akun? <a href="/register">Register sekarang</a>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;
