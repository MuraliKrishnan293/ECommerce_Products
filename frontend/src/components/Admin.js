import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [len, setLen] = useState();
  const [forms, setForms] = useState([]);
  const authToken = localStorage.getItem("authToken");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    const res = async () => {
      try {
        const data = await axios.get(
          "http://localhost:5000/app/getTotalProducts",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (data) {
          setLen(data.data.len);
          // console.log('data', data.data.len);
          console.log("Len of Cart : ", data.data.len);
        }
      } catch (e) {
        console.log(e);
      }
    };
    res();
  }, [authToken]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:5000/app/totalusers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      console.log(res.data);
      setUsers(res.data);
    };
    fetchData();
  }, [authToken]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:5000/app/formget", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      console.log(res.data);
      setForms(res.data);
    };
    fetchData();
  }, [isAdmin === "true", authToken]);

  console.log("FinalLen : ", len);

  return (
    <>
      {isAdmin ? (
        <div className="container">
          <div className="admin row">
            <div className="col-12 admin_left">
              <div className="users">
                <h1>Users</h1>
                <div className="users_list table">
                  <tr className="thead">
                    <th>Username</th>
                    <th>UserEmail</th>
                  </tr>
                  {users.map((user) => {
                    return (
                      <div className="users_list_item" key={user._id}>
                        <tr className="tbody">
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                        </tr>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-12 totalproducts text-center text-danger">
              <h1>Total Products</h1>
              {len !== null ? (
                <h5 className="text-light">{len}</h5>
              ) : (
                <p>Loading...</p>
              )}
            </div>
            <div className="col-md-6 col-12 my-3 text-center addproducts">
              <a
                className="mt-5 pt-5 h3 hovering"
                style={{ textDecoration: "none" }}
                href="/create"
              >
                Click Here to Add Products
              </a>
            </div>
          </div>
          <div className="row d-flex justify-content-center align-items-center formreview row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3">
            {forms?.map((form) => (
              <div className="col gap-2 mt-3">
                <div style={{ height: "219px" }} className="card" key={form.id}>
                  <div className="card-body">
                    <h5 className="card-title">{form.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {form.email}
                    </h6>
                    <p className="card-text">{form.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* </div> */}
        </div>
      ) : null}
    </>
    // </div>
    // </div>
  );
};

export default Admin;
