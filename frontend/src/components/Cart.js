import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { removeFromCart } from "../cartLogics/cartSlice";
import { useDispatch, useSelector } from "react-redux";
// import { checkout } from "../../../backend/cart";

const Cart = () => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState([]);
  const authToken = localStorage.getItem("authToken");
  const userid = localStorage.getItem("id");
  // if(!authToken){
  //   return(<div>Login</div>)
  // }
  // useEffect(() => {
  //   const fetchdata = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:5000/app/getcart", {
  //         headers: {
  //           Authorization: `Bearer ${authToken}`,
  //         },
  //       });
  //       if (res) {
  //         console.log(res);
  //       }
  //       setDetails(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchdata();
  // }, []);
  const cartItems = useSelector((state) => state.cart);



  function removeCart(data) {
    console.log("Removing item with id : ", data);
    dispatch(removeFromCart(data.id));
  }

  const datas = useSelector((state) => state.cart);
  console.log('datas : ',datas)


  if(!authToken){
    return(<div>Login</div>)
  }

  async function addtocart() {
    // console.log('[]:'[datas]);
    // console.log('datas:',datas);
    try {
        const res = await axios.post('http://localhost:5000/app/addtocart',{
          userid,
          orderdata: datas
      },{
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        console.log(res);
        // res.json(res)

        // alert(`Your order has been added to the cart!`);
    } catch (error) {
        console.error(error);
        // alert(`Failed to add the order to the cart: ${error.message}`);
    }
}



  return (
    <div className="container-fluid p-4">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4  d-flex justify-content-center">
        {datas.map((data) => (
          <div className="col">
            <div
              className="card p-3 bg-warning"
              style={{ height: "420px" }}
              key={data.id}
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
              <button
                onClick={(id) => removeCart(data)}
                className=" btn btn-danger text-center"
              >
                Remove from Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="row">
        <div>
          <h3 className="text-center mt-5 fw-bolder">
            The Total Estimated Cost is:
          </h3>
        </div>
      </div>
      <button className="btn btn-primary" onClick={addtocart}>Checkout</button>
    </div>
  );
};

export default Cart;
