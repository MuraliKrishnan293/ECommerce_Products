import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const userid = localStorage.getItem("id");

  const toastOptions = {
    position: "top-left",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/app/login", {
        email,
        password,
      });
      if (res.data) {
        // alert(res.data);
        console.log(res.data);
        toast.success("User logged in successfully", res.data);
      }
      if (res.data.authToken) {
        localStorage.setItem("authToken", res.data.authToken);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("id", res.data.userid);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("isAdmin", res.data.isAdmin);
        // toast.success('User logged in successfully');
        // const cartItems = localStorage.getItem(`cartItems_${userid}`);
        navigate("/products");
      }
    } catch (error) {
      console.log(error);
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
    <div className="container-fluid d-flex align-items-center logs justify-content-center">
      <form className="br-5 rounded my-5 p-4 lform">
        <h4 className="text-danger">Login Here</h4>
        <div className="form-group">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="form-control"
          />
        </div>
        <div className="form-group">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            onClick={handleSubmit}
            className="form-control mt-2"
          />
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
