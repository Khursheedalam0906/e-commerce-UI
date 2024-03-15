import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./Cart.css";
import { auth, db } from "../Firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import CartCard from "./CartCard";

const Cart = () => {
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
      <Navbar />
      {cartdata.length != 0 ? (
        <div>
          <div className="cart-head">Your cart items</div>
          <div className="allcartitems">
            {cartdata.map((item) => (
              <CartCard
                key={item.id}
                itemdata={item}
                userid={loggeduser[0]?.uid}
              />
            ))}
          </div>
          <div className="proceed">
            <button>Proceed</button>
          </div>
        </div>
      ) : (
        <p className="empty-cart">Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
