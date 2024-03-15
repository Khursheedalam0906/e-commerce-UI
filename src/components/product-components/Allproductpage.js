import React, { useEffect, useState } from "react";
import "./Allproductpage.css";
import Navbar from "../Navbar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig";
import Productcontainer from "./Productcontainer";
import "./Allproductpage.css";

const Allproductpage = ({ type }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = () => {
      const productsArray = [];
      const path = `products-${type.toUpperCase()}`;

      getDocs(collection(db, path))
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            productsArray.push({ ...doc.data(), id: doc.id });
            // console.log("Data", doc.data());
          });
          setProducts(productsArray);
          //console.log("A", productsArray);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    getProducts();
  }, []);

  console.log("P.Array", products);

  // console.log("Hello", type);
  return (
    <div className="allproductpage">
      <Navbar />
      <div className="heading">
        <p>Top reasult for {type}</p>
      </div>
      <div className="allproductcontainer">
        {products.map((product) => (
          <Productcontainer key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Allproductpage;
