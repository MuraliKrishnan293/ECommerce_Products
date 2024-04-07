import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { fetchCartItems, removeCart } from "../cartLogics/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState([]);
  const authToken = localStorage.getItem("authToken");
  const userid = localStorage.getItem("id");
  const { items } = useSelector((state) => state.cart);

  const toastOptions = {
    position: "top-left",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handle = async (id) => {
    console.log("Dispatching id: ", id);
    dispatch(removeCart(id));
    toast.error("Removing from cart", toastOptions);
  };

  useEffect(() => {
    if (authToken) dispatch(fetchCartItems());
  }, [dispatch, authToken]);

  useEffect(() => {
    if (!authToken) {
      return <div>Login</div>;
    }
  }, [authToken]);

  return (
    <div className="container-fluid p-4">
      {items && items.length > 0 ? (
        <>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4  d-flex justify-content-center">
            {items.map((detail) =>
              detail.items.map((data) => (
                <div className="col" key={data.id}>
                  {/* {console.log('Data:', data)} */}
                  <div
                    className="card p-3 bg-warning"
                    style={{ height: "420px" }}
                  >
                    <div className="card-img-top d-flex justify-content-center card-img">
                      <img
                        src={data.image}
                        style={{ height: "250px" }}
                        className="img-fluid"
                        alt="cart_images"
                      />
                    </div>
                    <h6>Quantity :{data.count}</h6>
                    <div className="card-title">{data.title}</div>
                    <div className="badge mt-auto">{data.price}</div>
                    <a href="/cart">
                      <button
                        onClick={() => handle(data._id)}
                        className=" btn btn-danger text-center"
                      >
                        Remove from Cart
                      </button>
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="row">
            <div>
              <h3 className="text-center mt-5 fw-bolder">
                The Total Estimated Cost is:
              </h3>
            </div>
          </div>
        </>
      ) : null}
      <ToastContainer />
      {/* <button className="btn btn-primary" onClick={addtocart}>Checkout</button> */}
    </div>
  );
};

export default Cart;
