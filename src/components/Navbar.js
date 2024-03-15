import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import profileicon from "../components/assets/user.png";
import carticon from "../components/assets/cartIcon.png";
import logo from "../components/assets/logo2.png";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../Firebase/firebaseConfig";

const Navbar = () => {
  const GetCurrentUser = () => {
    const [userData, setUserData] = useState(null);
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const getData = async () => {
            const q = query(
              collection(db, "users"),
              where("uid", "==", user.uid)
            );
            //console.log(q);
            const data = await getDocs(q);
            setUserData(
              data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
          };
          getData();
        } else {
          setUserData(null);
        }
      });
    }, []);
    return userData;
  };

  const loggeduser = GetCurrentUser();
  if (loggeduser) {
    console.log(loggeduser[0]);
  }

  const [cartdata, setCartdata] = useState([]);
  if (loggeduser) {
    const getCartData = async () => {
      const cartArray = [];
      const path = `cart-${loggeduser[0]?.uid}`;
      getDocs(collection(db, path))
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            cartArray.push({ ...doc.data(), id: doc.id });
          });
          setCartdata(cartArray);
        })
        .catch("Error error error");
    };
    getCartData();
  }

  return (
    <div>
      <div className="navbar">
        <div className="left-container">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="right-container">
          {!loggeduser && (
            <nav>
              <Link to="/">
                <button>Home</button>
              </Link>

              <Link to="/cart">
                <div className="cart-btn">
                  <img src={carticon} alt="CartImg" />
                  <span className="cart-icon">0</span>
                </div>
              </Link>
              <Link to="/profile">
                <img
                  src={profileicon}
                  className="profile-icon"
                  alt="ProfileImg"
                />
              </Link>
            </nav>
          )}
          {loggeduser && (
            <nav>
              <Link to="/">
                <button>Home</button>
              </Link>
              <Link to="/cart">
                <div className="cart-btn">
                  <Link to="/cartdata">
                    <img src={carticon} alt="Carticon" />
                  </Link>
                  <span className="cart-icon">{cartdata.length}</span>
                </div>
              </Link>
              <Link to="/profile">
                <img
                  src={profileicon}
                  className="profile-icon"
                  alt="ProfileImg"
                />
              </Link>
            </nav>
          )}
        </div>
      </div>
      <div className="product-types">
        <a href="/product-type/mobiles">
          <button>Mobiles</button>
        </a>

        <a href="/product-type/laptops">
          <button>Laptops</button>
        </a>
        <a href="/product-type/cameras">
          <button>Cameras</button>
        </a>
        <a href="/product-type/shoes">
          <button>Shoes</button>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
