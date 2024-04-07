import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const { id } = useParams();

  const toastOptions = {
    position: "top-left",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/app/getsingledata/${id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const { title, description, image, price, category } = res.data;
        setTitle(title);
        setDescription(description);
        setImage(image);
        setPrice(price);
        setCategory(category);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    };

    fetch();
  }, [id, authToken]);

  const use = () => {
    navigate("/Products");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.put(
      `http://localhost:5000/app/updateproduct/${id}`,
      {
        title,
        description,
        image,
        price,
        category,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    console.log(res);
    if (res.status === 200) {
      toast.success("Product Updated Successfully");
    } else if (res.status === 404) {
      toast.error(res.data.message);
    }
  };

  return (
    <div
      style={{ minHeight: "90vh" }}
      className="container-fluid d-flex justify-content-center align-items-center"
    >
      <div className="create-product">
        <h1>Update Product</h1>
        <form>
          <div className="form-group">
            <label>Title</label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Image Url</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group mt-3">
            <label>Category </label>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="women's clothing">Women's Clothing</option>
              <option value="jewelery">Jewelery</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="electronics">Electronics</option>
            </select>
          </div>
          <div className="form-group text-center mt-3">
            <button
              onClick={(e) => handleFormSubmit(e)}
              className="btn btn-primary form"
            >
              Submit
            </button>
            <button onClick={use} className="btn mx-1 btn-danger form">
              Move to Product Page
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateProduct;
