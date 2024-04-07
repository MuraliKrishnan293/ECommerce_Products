import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartSlice } from "../cartLogics/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Nav = () => {
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const userid = localStorage.getItem("id");
  const [details, setDetails] = useState([]);
  const id = localStorage.getItem("id");
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const toastOptions = {
    position: "top-left",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleLogout = async () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.removeItem(`cartItems_${userid}`);
    localStorage.removeItem("isAdmin");
    toast.success("Logged Out");
    navigate("/");
  };

  const handleLogin = async () => {
    navigate("/login");
  };

  const cart = useSelector((state) => state.cart);

  return (
    <div className="">
      <nav className="navbar sticky-top rounded-5 navbar-expand-lg text-white">
        <button
          className="navbar-toggler m-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-brand p-3 text-white ms-auto">
          <a className="text-white" style={{ textDecoration: "none" }} href="/">
            Shopify
          </a>
        </div>
        <div className="navbar-collapse ms-sm-auto collapse" id="nav">
          <ul
            className="navabr-nav d-lg-flex mt-1 float-lg-right ms-auto p-2"
            style={{ listStyle: "none" }}
          >
            <li className="nav-item p-2">
              <a href="/" className="nav-link">
                Land
              </a>
            </li>

            {authToken ? (
              <>
                <li className="nav-item p-2">
                  <a href="/products" className="nav-link">
                    Home
                  </a>
                </li>
                <li className="nav-item p-2">
                  <Link to="/cart" className="nav-link">
                    Cart
                  </Link>
                </li>
                <li className="nav-item p-2">
                  <a className="nav-link" href="/user">
                    Your Info
                  </a>
                </li>
                {isAdmin ? (
                  <li className="nav-item p-2">
                    <a
                      className="text-white"
                      style={{ textDecoration: "none" }}
                      href="/admin"
                    >
                      Admin
                    </a>
                  </li>
                ) : null}
                <button onClick={handleLogout} className="btn btn-primary">
                  Logout
                </button>
              </>
            ) : (
              <button onClick={handleLogin} className="btn btn-primary">
                Login
              </button>
            )}
          </ul>
        </div>
      </nav>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Nav;
