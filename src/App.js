import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import FOFpage from "./components/FOFpage";
import Login from "./components/Login";
import Cart from "./components/Cart";
import Profile from "./components/Profile";
import Addproduct from "./components/Addproduct";
import Allproductpage from "./components/product-components/Allproductpage";
import Specificproductpage from "./components/Specificproductpage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/cartdata" element={<Cart />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/sellerproduct" element={<Addproduct />} />
        <Route
          exact
          path="/product-type/mobiles"
          element={<Allproductpage type={"Mobiles"} />}
        />
        <Route
          exact
          path="/product-type/laptops"
          element={<Allproductpage type={"Laptops"} />}
        />
        <Route
          exact
          path="/product-type/cameras"
          element={<Allproductpage type={"Cameras"} />}
        />
        <Route
          exact
          path="/product-type/shoes"
          element={<Allproductpage type={"Shoes"} />}
        />
        <Route path="/product/:id/:type" element={<Specificproductpage />} />

        <Route path="*" element={<FOFpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
