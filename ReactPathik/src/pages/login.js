import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";

const Login = () => {
  //usestate
  const [userData, setUserData] = useState({});
  const location = useNavigate();

  //handle change
  const onhandlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]: value });
  };

  const Login = async () => {
    try {
      const response = await axiosInstance.post("login", userData);

      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user_id", response.data.data.UserID);
      localStorage.setItem("user",JSON.stringify(response.data.data));
      localStorage.setItem("stdname",response.data.data.firstname)
      if (response) {
        setTimeout(() => {
          location("/home");
        }, 1500);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    }
  };

  return (
    <>
      <section className="section login-section text-center w-50 mx-auto">
        <div className="container">
          <div className="login-card">
            <div className="login-img text-center">
              <h4>Login</h4>
            </div>
            <div className="login-detail mt-2">
              <input
                type="text"
                className="input-text"
                name="email"
                placeholder="Enter Email"
                value={userData.email}
                onChange={(e) => onhandlechange(e)}
              ></input>

              <input
                type="password"
                className="input-text"
                name="password"
                placeholder="Enter Password"
                value={userData.password}
                onChange={(e) => onhandlechange(e)}
              ></input>

              <button
                type="button"
                className="btn-login mt-5"
                onClick={() => Login()}
              >
                Login
              </button>
            </div>
            <p className="mt-4">
              Create an account ?{" "}
              <NavLink to="/sign-up">
                <span>&nbsp;Sign Up</span>{" "}
              </NavLink>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
