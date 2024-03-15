import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../Firebase/firebaseConfig";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SliderProductCart from "./SliderProductCart";

const ProductSlider = ({ type }) => {
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

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  console.log("P.Array", products);
  return (
    <div>
      <Carousel responsive={responsive}>
        {products.map((product) => (
          <SliderProductCart key={product.id} product={product} />
        ))}
      </Carousel>
    </div>
  );
};

export default ProductSlider;
