import React, { useEffect, useRef, useState } from "react";
import { PageHeader } from "../Layouts/header";
import { Input } from "../Components/InputForm/inputForm";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { addUser } from "../Services/api";

const Register = () => {
  const cookiesToken = Cookies.get("token");
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const [regForm, setRegForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegForm({ ...regForm, [name]: value });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      buttonRef.current.click();
    }
  };

  useEffect(() => {
    if (cookiesToken) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = () => {
    const fetchData = async () => {
      const user = await addUser({ regForm, setErrors });
      Cookies.set("token", user.token, { expires: 2 });
      navigate("/");
    };

    fetchData();
  };

  return (
    <>
      <PageHeader location={"/login"} />
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="d-flex flex-column justify-content-center align-items-center p-2 mb-3">
              <h3 className="mt-2">Register</h3>
            </div>
            <Input
              inputLabel={"Nama"}
              typeInput={"text"}
              nameInput={"name"}
              placeholder={"Masukkan nama anda"}
              onKeyDown={handleKeyPress}
              onChange={handleInputChange}
              error={errors.name}
            />
            <Input
              inputLabel={"Alamat email"}
              typeInput={"email"}
              nameInput={"email"}
              placeholder={"Masukkan alamat email anda"}
              onKeyDown={handleKeyPress}
              onChange={handleInputChange}
              error={errors.email}
            />
            <Input
              inputLabel={"Password"}
              typeInput={"password"}
              nameInput={"password"}
              placeholder={"Masukkan password anda"}
              onKeyDown={handleKeyPress}
              onChange={handleInputChange}
              error={errors.password}
            />
            <Input
              inputLabel={"Konfirmasi password"}
              typeInput={"password"}
              nameInput={"password_confirmation"}
              placeholder={"Masukkan konfirmasi password anda"}
              onKeyDown={handleKeyPress}
              onChange={handleInputChange}
              error={errors.password}
            />
            <button
              className="btn shadow color__secondary text-white w-100"
              ref={buttonRef}
              onClick={handleSubmit}
            >
              Register
            </button>
            <p className="text-center mt-3">
              Sudah mempunyai akun? <a href="/login">Login sekarang</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
