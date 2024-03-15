import React from "react";
import "./SliderProductCart.css";
import { Link } from "react-router-dom";

const SliderProductCart = ({ product }) => {
  let overalltax = 10 / 100;
  let overcommission = 10 / 100;
  let extraforfun = 10 / 100;

  let mrp = parseInt(product.price);
  mrp = mrp + overalltax * mrp + overcommission * mrp + extraforfun * mrp;
  const saleprice = mrp - extraforfun * mrp;

  return (
    <div className="mini-product-container">
      <div className="mini-img-container">
        <img src={product.productImg} alt="productImg" />
      </div>

      <div className="mini-product-details">
        <p className="mini-producttitle">
          {product.productTitle.substring(0, 20)}
        </p>
        <div className="mini-price-container">
          <p className="mrp">
            MRP:<p className="rate">Rs: {mrp}</p>
          </p>
          <p className="saleprice">
            Discount Price:{" "}
            <p className="rate" style={{ color: "green" }}>
              Rs {saleprice}
            </p>
          </p>
          <p className="yousave">You Save: Rs {mrp - saleprice}</p>
        </div>
        <Link to={`/product/${product.id}/${product.productType}`}>
          <button className="showmore-btn">Show more &gt;</button>
        </Link>
      </div>
    </div>
  );
};

export default SliderProductCart;
