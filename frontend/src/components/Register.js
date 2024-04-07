import React from "react";
import "./style.css";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toastOptions = {
    position: "top-left",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleValidation = () => {
    if (username === "" && username.length < 4) {
      toast.error("Name must be at least 4 characters", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    } else if (password === "" && password.length < 8) {
      toast.error("Password must be at least 8 characters", toastOptions);
      return false;
    }
    return true;
    // handleSubmit();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (handleValidation()) {
        const req = await axios.post("http://localhost:5000/app/register", {
          username: username,
          email: email,
          password: password,
        });
        if (req.status === 200) {
          toast.success("Registered Successfully", toastOptions);
          window.location.href = "/login";
        }
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data;
        if (errorMessage === "Username Exists") {
          toast.error("Username already exists", toastOptions);
        } else if (errorMessage === "Email Exists") {
          toast.error("Email already exists", toastOptions);
        } else {
          toast.error(
            "Registration failed. Please try again later",
            toastOptions
          );
        }
      } else {
        toast.error(
          "Registration failed. Please try again later",
          toastOptions
        );
      }
    }
  };

  return (
    <div className="register">
      <div className="container registration">
        <h1 className="fw-bold text-center p-4">Register Form</h1>
        <form className="form">
          <div className="d-flex flex-row form-group">
            <h6 className="fw-bold mt-2 p-1 mx-2">Username:</h6>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="d-flex mt-3 flex-row form-group">
            <h6 className="fw-bold mt-2 p-1 mx-2">Email:</h6>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="d-flex mt-3 mb-5 flex-row form-group">
            <h6 className="fw-bold mt-2 p-1 mx-2">Password:</h6>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="d-flex align-items-center justify-content-center mb-2 text-center form-group">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Register
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
