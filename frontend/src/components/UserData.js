import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

const UserData = () => {
  // const [data,setData] = useState([])
  const authToken = localStorage.getItem("authToken");
  const userId = localStorage.getItem("id");
  const name = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  return (
    <div className="container-fluid userc d-flex justify-content-center align-items-center">
      <div className="userdata p-4 rounded text-center">
        <h1 className="fw-bolder text-info">User Details</h1>
        <h6 className="text-white">{name}</h6>
        <h6 className="text-white">{email}</h6>
      </div>
    </div>
  );
};

export default UserData;
