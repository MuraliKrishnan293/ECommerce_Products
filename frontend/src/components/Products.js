import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { addToCart } from "../cartLogics/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [item, setItem] = useState([]);
  const authToken = localStorage.getItem("authToken");
  const id = localStorage.getItem("userid");

  const toastOptions = {
    position: "top-left",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const res = async () => {
      try {
        const data = await axios.get("http://localhost:5000/app/getData", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setLoading(false);
        if (data) {
          setProducts(data.data);
          //   setProducts(item.data)
          setItem(data.data);
          //   console.log('The items are :',item)
          // console.log(data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    res();
  }, []);

  //   console.log('Item Values :',item)

  /////////////////////My Old Cart Logic////////////////////////////////

  const Cart = async (pid, image, title, price) => {
    // dispatch(addToCart({id,title,price,image}));
    const res = await axios.post(
      "http://localhost:5000/app/addtocart",

      { pid, title, price, image },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    console.log(res);
    if (res.status === 200) {
      toast.success("Item Added to Cart Successfully", toastOptions);
    }
  };

  const filterItems = (catItem) => {
    const updateItems = item.filter((curItem) => {
      return curItem.category === catItem;
    });
    setProducts(updateItems);
    console.log(updateItems);
  };

  if (!authToken) {
    return <div>Login</div>;
  }

  return (
    <>
      {authToken && (
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 sticky-md-top cat">
              <h4 className="text-center">Categories</h4>
              <div className="d-flex flex-wrap d-md-flex flex-md-column align-items-center">
                <div className="d-flex px-2 flex-row">
                  <input
                    type="radio"
                    name="c"
                    onClick={() => setProducts(item)}
                  />
                  <h6>All</h6>
                </div>
                <div className="d-flex px-2 flex-row">
                  <input
                    type="radio"
                    name="c"
                    onClick={() => filterItems("men's clothing")}
                  />
                  <h6>Men</h6>
                </div>
                <div className="d-flex px-2 flex-row">
                  <input
                    type="radio"
                    name="c"
                    onClick={() => filterItems("jewelery")}
                  />
                  <h6>Jewelery</h6>
                </div>
                <div className="d-flex px-2 flex-row">
                  <input
                    type="radio"
                    name="c"
                    onClick={() => filterItems("electronics")}
                  />
                  <h6>Electronics</h6>
                </div>
                <div className="d-flex px-2 flex-row">
                  <input
                    type="radio"
                    name="c"
                    onClick={() => filterItems("women's clothing")}
                  />
                  <h6>Women</h6>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-8 text-center bg-warning">
              <div className="row">
                <h4>Products</h4>
                {products.map((product) => (
                  <div
                    className="col-12 col-sm-12 col-md-6 mt-3"
                    key={product.id}
                  >
                    <div className="card p-3" style={{ height: "450px" }}>
                      {/* <a><img src={product.image} className="img-fluid" style={{height:'250px'}} /></a> */}
                      <a href={`/specific/${product._id}`}>
                        <img
                          className="img-fluid"
                          src={product.image}
                          style={{ height: "250px" }}
                        />
                      </a>
                      <div className="card-title">{product.title}</div>
                      <div className="card-text text-truncate">
                        {product.description}
                      </div>
                      <div className="card-text">{product.price}</div>
                      <div
                        className="mt-auto card-btn btn btn-primary rounded"
                        onClick={() =>
                          Cart(
                            product.id,
                            product.image,
                            product.title,
                            product.price
                          )
                        }
                      >
                        {/* {console.log(product.id)} */}
                        Add to Cart
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* <ToastContainer /> */}
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Products;
