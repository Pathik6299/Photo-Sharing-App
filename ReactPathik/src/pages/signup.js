import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";

const SignUp = () => {
  //usestate
  const [userData, setUserData] = useState({});
  const location = useNavigate();

  //handle change
  const onhandlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const cerateUser = async () => {
    try {
      const response = await axiosInstance.post("register", userData);

      if (response) {
        setTimeout(() => {
          location("/");
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
              <h4>Sign Up</h4>
            </div>
            <div className="login-detail mt-2">
              <input
                type="text"
                className="input-text"
                name="firstname"
                placeholder="Enter First Name"
                value={userData.firstname}
                onChange={(e) => onhandlechange(e)}
              ></input>

              <input
                type="text"
                className="input-text"
                name="lastname"
                placeholder="Enter Last Name"
                value={userData.lastname}
                onChange={(e) => onhandlechange(e)}
              ></input>

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

              <input
                type="password"
                className="input-text"
                name="confirm_password"
                placeholder="Enter Confirm Password"
                value={userData.confirm_password}
                onChange={(e) => onhandlechange(e)}
              ></input>

              <button
                type="button"
                className="btn-login mt-5"
                onClick={() => cerateUser()}
              >
                Sign Up
              </button>
            </div>
            <p className="mt-4">
              Already have an account ?{" "}
              <NavLink to="/">
                <span>&nbsp;Sign In</span>{" "}
              </NavLink>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
