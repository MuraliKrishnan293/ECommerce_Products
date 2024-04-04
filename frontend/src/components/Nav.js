import React from "react";
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartSlice } from '../cartLogics/cartSlice'

const Nav = () => {
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const userid = localStorage.getItem('id');

  const handleLogout = async()=>{
    localStorage.removeItem('authToken')
    localStorage.removeItem('username')
    localStorage.removeItem('id')
    localStorage.removeItem('email')
    localStorage.removeItem(`cartItems_${userid}`);
    navigate('/')
  }

  const handleLogin = async()=>{
    navigate('/login');
  }

  const cart = useSelector(state=>state.cart)

  return (
    <div className="container-fluid">
      <div className="navbar navbar-expand-lg bg-secondary text-white">
        <button
          className="navbar-toggler m-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-brand p-3">Shopify</div>
        <div className="navbar-collapse ms-sm-auto collapse" id="nav">
          <ul
            className="navabr-nav d-lg-flex float-lg-right ms-auto p-2"
            style={{ listStyle: "none" }}
          >
            
            
            <li className="nav-item p-2">
              <a href="/" className="nav-link">
                Land
              </a>
            </li>
            
            {authToken ? <>
                <li className="nav-item p-2">
                <a href="/products" className="nav-link">
                  Home
                </a>
              </li>
              <li className="nav-item p-2">
              <Link to="/cart" className="nav-link">Cart {cart.length}</Link>
            </li>
            <li className="nav-item p-2">
              <a className="nav-link" href="/user">Your Info</a>
            </li>
              <button onClick={handleLogout} className="btn btn-primary">Logout</button>
            </> : (
              <button onClick={handleLogin} className="btn btn-primary">Login</button>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
