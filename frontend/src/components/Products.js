import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { addToCart } from "../cartLogics/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Products = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [checked,setChecked] = useState([]);
  const [item,setItem] = useState([])  
  const authToken = localStorage.getItem("authToken");

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
          setItem(data.data)
        //   console.log('The items are :',item)
          console.log(data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    res();
  }, []);

//   console.log('Item Values :',item)
  

  

  /////////////////////My Old Cart Logic////////////////////////////////


  // const Cart = async (id, image, title, price) => {
  //   const res = await axios.post(
  //     "http://localhost:5000/app/addtocart",
  //     { id, title, price, image },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${authToken}`,
  //       },
  //     }
  //   );
  //   // console.log(res);
  // };

 const filterItems = (catItem)=>{
    const updateItems=item.filter((curItem)=>{
        return curItem.category === catItem
    });
    setProducts(updateItems);
 }

 //Redux Logic
  const Cart = (product) => {
    dispatch(
      addToCart(product)
      // type: "ADD_TO_CART",
      // payload: {
      //   id,
      //   image,
      //   title,
      //   price,
    );
  };

  // const removeFromCart = (id) => {
  //   dispatch({
  //     type: "REMOVE_FROM_CART",
  //     payload: id,
  //   });
  // };

  // const updateQuantity = (id, quantity) => {
  //   dispatch({
      // type: "UPDATE_QUANTITY",?
  //     payload: {
  //       id,
  //       quantity,
  //     },
  //   });
  // };




  return (
    <div className="container">
      {/* <div className='row mt-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3'>
            {loading ? (<div className='text-center py-5 my-5 mx-5 px-4 d-flex text-center justify-content-center align-items-center'><div className='spinner-container d-flex text-center justify-content-center align-items-center'><div class="spinner-border text-primary m-1"></div><h4>Loading...</h4></div></div>):(
                    products.map((product)=>(
                        <div className='col' key={product.id}>
                        <div className='card p-2' style={{height:'450px'}}>
                            <div className='card-img-top d-flex justify-content-center'><a href={`/specific/${product.id}`}><img className='img-fluid' src={product.image} style={{height:'250px'}} /></a></div>
                            <div className='card-title'>{product.title}</div>
                            <div className='card-text text-truncate'>{product.description}</div>
                            <div className='card-text'>{product.price}</div>
                            <div className='mt-auto card-btn btn btn-primary rounded' onClick={()=>Cart(product.id,product.image,product.title,product.price)}>Add to Cart</div>
                        </div>
                        </div>
                    ))
            )}
        </div> */}

      <div className="row">


<div className="col-12 col-md-4 sticky-md-top  cat">
          <h4 className="text-center">Categories</h4>
          <div className="d-flex flex-wrap d-md-flex flex-md-column align-items-center">
         {/* <button className="btn" onClick={()=>setProducts(item)}>All</button>
         <button className="btn" onClick={()=>filterItems("men's clothing")}>Men</button>
         <button className="btn" onClick={()=>filterItems("jewelery")}>Jewelery</button>
         <button className="btn" onClick={()=>filterItems("electronics")}>Electronics</button>
         <button className="btn" onClick={()=>filterItems("women's clothing")}>Women</button> */}
         <div className="d-flex px-2 flex-row"><input type="radio" name="c" onClick={()=>setProducts(item)}/><h6>All</h6></div>
         <div className="d-flex px-2 flex-row"><input type="radio" name="c" onClick={()=>filterItems("men's clothing")}/><h6>Men</h6></div>
         <div className="d-flex px-2 flex-row"><input type="radio" name="c" onClick={()=>filterItems("jewelery")}/><h6>Jewelery</h6></div>
         <div className="d-flex px-2 flex-row"><input type="radio" name="c" onClick={()=>filterItems("electronics")}/><h6>Electronics</h6></div>
         <div className="d-flex px-2 flex-row"><input type="radio" name="c" onClick={()=>filterItems("women's clothing")}/><h6>Women</h6></div>

        </div></div>






        <div className="col-12 col-md-8 text-center bg-warning">
            <div className="row">
          <h4>Products</h4>
          {products.map((product) => (
            <div className="col-12 col-sm-12 col-md-6 mt-3" key={product.id}>
              <div className="card p-3" style={{ height: "450px" }}>
                {/* <a><img src={product.image} className="img-fluid" style={{height:'250px'}} /></a> */}
                <a href={`/specific/${product.id}`}>
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
                      product
                      // product.image,
                      // product.title,
                      // product.price
                    )
                  }
                >
                  Add to Cart
                </div>
              </div>
            </div>
          ))}</div>
        </div>
      </div>
    </div>
  );
};

export default Products;
