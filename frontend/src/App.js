import Land from "./components/Land";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Products from "./components/Products";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserData from "./components/UserData";
import Cart from "./components/Cart";
import SpecificProduct from "./components/SpecificProduct";
import CreateProduct from "./components/CreateProduct";
import UpdateProduct from "./components/UpdateProduct";
import Admin from "./components/Admin";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Land />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<UserData />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/specific/:id" element={<SpecificProduct />} />
          <Route path="/create" element={<CreateProduct />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
