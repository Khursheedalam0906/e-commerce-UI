import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Products from "./Products";
import Banner from "./Banner";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../Firebase/firebaseConfig";
import ProductSlider from "./product-components/ProductSlider";
import "./Home.css";

const Home = () => {
  const GetCurrentUser = () => {
    const [userData, setUserData] = useState(null);
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const getData = async () => {
            const q = query(
              collection(db, "users"),
              where("uid", "==", user?.uid)
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

  return (
    <div>
      <Navbar />
      <Banner />
      <div className="slider-head">
        <p>Limited Time Deals</p>
      </div>
      <ProductSlider type={"Mobiles"} />
      <ProductSlider type={"Laptops"} />
      <ProductSlider type={"Cameras"} />
      <ProductSlider type={"Shoes"} />
      {loggeduser ? loggeduser[0]?.email : "No Data"}
    </div>
  );
};

export default Home;
