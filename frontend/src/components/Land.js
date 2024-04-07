import React, { useState } from "react";
import axios from "axios";
import land from "./images/bg-removebg-preview.png";
import "../App.css";
// import axios from 'axios';
import dresImage from "../components/images/dress.png";
import i1 from "../components/images/i1.avif";
import i2 from "../components/images/i2.jpeg";
import i3 from "../components/images/i3.avif";
import i4 from "../components/images/i4.avif";
import i5 from "../components/images/i5.avif";
import i6 from "../components/images/i6.avif";
import i7 from "../components/images/i7.avif";
import i8 from "../components/images/i8.avif";
import i9 from "../components/images/i9.webp";
import cshoe from "../components/images/cshoe.avif";
import cdress from "../components/images/cdress.avif";
import cwatch from "../components/images/cwatch.avif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Land = () => {
  const authToken = localStorage.getItem("authToken");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const toastOptions = {
    position: "top-left",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handle = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/app/formpost", {
      name,
      email,
      message,
    });
    toast.success("Message Sent");
  };

  return (
    <>
      <div className="container-fluid landing">
        <div className="row">
          <div className="col-12 text-center my-lg-5 py-lg-5 my-md-5 py-md-5 col-md-6">
            <h2 className="mt-5 pt-5 fw-bolder">Welcome to Shopify!</h2>
            <h4 className="fw-light fs-1">
              <span className="text-info">India's</span> Biggest Online{" "}
              <span className="text-primary">Shopping Mart</span>
            </h4>
            {authToken ? (
              <></>
            ) : (
              <button className="btn text-white btn-primary">
                <a
                  className="text-white"
                  style={{ textDecoration: "none" }}
                  href="/login"
                >
                  Login
                </a>
              </button>
            )}
          </div>
          <div className="col-12 my-lg-3 py-lg-3 my-md-3 py-md-3 col-md-6 text-center">
            <img src={land} className="img-fluid" alt="shop" />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <img src={dresImage} className="img-fluid" />
          </div>
          <div className="col-12 col-md-6 my-lg-5 py-lg-5 p-1">
            <h1 className="fw-bold mt-md-5 pt-md-5 text-center h1">
              <span className="text-danger">Cool</span> Collections
            </h1>
            <p className="text-center fs-4 grad text-info">
              Here You can be able to browse various collections of items and
              these are along with various offers and at an afoordable rate with
              free shipping. Grow your online presence from anywhere.
              Mailchimp’s mobile app lets you create a simple, one-click landing
              page where you can share
            </p>
          </div>
        </div>
      </div>

      <div className="container categories">
        <div className="row p-3 fw-bolder d-flex justify-content-center">
          <div className="col-12 p-3 col-md-4">
            <div className="card" style={{ height: "350px" }}>
              <img
                src={cwatch}
                className="img-fluid card-img"
                style={{ height: "350px" }}
              />
              <div class="card-img-overlay mt-center text-center my-5">
                <h6 className="my-5 pt-5 fw-normal fs-4 text-secondary">
                  Watch
                </h6>
              </div>
            </div>
          </div>
          <div className="col-12 p-3 col-md-4">
            <div className="card" style={{ height: "350px" }}>
              <img
                src={cshoe}
                className="img-fluid card-img"
                style={{ height: "350px" }}
              />
              <div class="card-img-overlay text-center mt-5">
                <h5 className="my-5 pt-5 fw-normal fs-4 text-warning">Shoe</h5>
              </div>
            </div>
          </div>
          <div className="col-12 p-3 col-md-4">
            <div className="card" style={{ height: "350px" }}>
              <img
                src={cdress}
                className="img-fluid card-img"
                style={{ height: "350px" }}
              />
              <div class="card-img-overlay mt-center text-center my-5">
                <h5 className="my-5 pt-5 fw-normal fs-4 text-info">Dresses</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid alltypeimages rounded">
        <div className="top">
          <h1 className="text-center text-info">Trendy Collections</h1>
        </div>
        <div className="row row-cols-lg-4 row-cols-sm-2 row-cols-1">
          <div className="col">
            <div className="row same">
              <img src={i1} className="img-fluid" />
            </div>
            <div className="row same">
              <img src={i2} className="img-fluid" />
            </div>
          </div>
          <div className="col">
            <div className="row same">
              <img src={i3} className="img-fluid" />
            </div>
            <div className="row same">
              <img src={i4} className="img-fluid" />
            </div>
            {/* <div className='row same'><img src={i9} className='img-fluid' /></div> */}
          </div>
          <div className="col">
            <div className="row same">
              <img src={i5} className="img-fluid" />
            </div>
            <div className="row same">
              <img src={i6} className="img-fluid" />
            </div>
            <div className="row same">
              <img src={i8} className="img-fluid" />
            </div>
            {/* <div className='row same'><img src={i9} className='img-fluid' /></div> */}
          </div>
          <div className="col">
            <div className="row same">
              <img src={i7} className="img-fluid" />
            </div>
            {/* <div className='row same'><img src={i8} className='img-fluid' /></div> */}
          </div>
        </div>
      </div>

      <div className="container review">
        <h2 className="text-center">Reviews</h2>
        <div className="row p-3 d-flex justify-content-center">
          <div className="col-12 p-3 col-md-3">
            <div className="card p-3">
              <div className="card-title">Nehru</div>
              <div className="card-text">
                I've been sourcing my nail supplies from Nail Supplies Mumbai
                for quite some time now, and I must say, it's been an
                exceptional experience. Their range of products caters to all my
                needs, whether it's for professional use or personal grooming.
              </div>
            </div>
          </div>
          <div className="col-12 p-3 col-md-3">
            <div className="card p-3">
              <div className="card-title">Abraham</div>
              <div className="card-text">
                The quality of their products is top-notch, and I've never been
                disappointed with any purchase. Additionally, their customer
                service is commendable – they are always helpful and prompt in
                addressing any queries or concerns I may have.
              </div>
            </div>
          </div>
          <div className="col-12 p-3 col-md-3">
            <div className="card p-3">
              <div className="card-title">Sam</div>
              <div className="card-text">
                Its like a trusted friend for choosing the right ecommerce
                platform. Their user-friendly site and insightful reviews cover
                everything you need to know. They cater to businesses of all
                sizes, making it a must-have resource.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid foot bg-secondary">
        <h1 className="fw-bolder text-primary">Shopify</h1>
        <div className="fro d-flex justify-content-center mt-5 mb-5 pb-4">
          <form className="for" onSubmit={handle}>
            <h3>Fill the below form if You have any queries</h3>
            Name:
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="name"
              placeholder="name"
              className="form-control"
            />
            Email:
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="email"
              className="form-control"
            />
            Message:
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="textbox"
              placeholder="message"
              className="form-control"
            />
            <button
              type="submit"
              className="btn btn-primary text-center"
              // onSubmit={(e)=>handle(e)}
            >
              Submit
            </button>
          </form>
        </div>
        <div className="row text-md-center">
          <div className="col-12 col-md-4">
            <h3>Privacy Policy</h3>
            <p>Credentials</p>
            <p>Reports</p>
            <p>ISO CERTIFIED</p>
          </div>
          <div className="col-12 col-md-4">
            <h3>Blogs</h3>
            <p>Reviews</p>
            <p>Types</p>
            <p>Service Down</p>
          </div>
          <div className="col-12 col-md-4">
            <h3>Contact</h3>
            <p>+91 4356789705</p>
            <p>Shopify@outlook.com</p>
            <p>Andaman Nagar, Nazarathpet, Chennai-26</p>
          </div>
        </div>
        <h6 className="text-center">@CopyRights Act 2004</h6>
        <ToastContainer />
      </div>
    </>
  );
};

export default Land;
