import React from "react";
import "./Productcontainer.css";
import { Link } from "react-router-dom";

const Productcontainer = ({ product }) => {
  let overalltax = 10 / 100;
  let overcommission = 10 / 100;
  let extraforfun = 10 / 100;

  console.log(product);

  let mrp = parseInt(product.price);
  mrp = mrp + overalltax * mrp + overcommission * mrp + extraforfun * mrp;
  const saleprice = mrp - extraforfun * mrp;

  return (
    <div className="product-container">
      <img src={product.productImg} />
      <div className="product-details">
        <Link to={`/product/${product.id}/${product.productType}`}>
          <button className="producttitle">{product.productTitle}</button>
        </Link>
        <div className="price-container">
          <p className="mrp">
            MRP:<p className="rate">Rs: {mrp}</p>
          </p>
          <p className="saleprice">
            Discount Price: <p className="rate">Rs {saleprice}</p>
          </p>
          <p className="yousave">You Save: Rs {mrp - saleprice}</p>
        </div>
        <Link to={`/product/${product.id}/${product.productType}`}>
          <button className="showmore-btn">More Details &gt;</button>
        </Link>
      </div>
    </div>
  );
};

export default Productcontainer;
