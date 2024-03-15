import React, { useState } from "react";
import button from "./assets/delete-button.png";
import "./CartCard.css";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";

const CartCard = ({ itemdata, userid }) => {
  const [productQuantity, setProductQuantity] = useState(itemdata.quantity);
  let overalltax = 10 / 100;
  let overcommission = 10 / 100;
  let extraforfun = 10 / 100;

  let mrp = parseInt(itemdata.product.price);
  mrp = mrp + overalltax * mrp + overcommission * mrp + extraforfun * mrp;
  const saleprice = (mrp - extraforfun * mrp) * productQuantity;

  const increasequantity = async () => {
    setProductQuantity(productQuantity + 1);

    const itemref = doc(db, `cart-${userid}`, `${itemdata.id}`);
    await updateDoc(itemref, {
      quantity: productQuantity + 1,
    }).then(() => {
      console.log("Changed quantity");
    });
  };

  const decreaseQuantity = async () => {
    if (productQuantity >= 1) {
      const itemref = doc(db, `cart-${userid}`, `${itemdata.id}`);
      setProductQuantity(productQuantity - 1);
      await updateDoc(itemref, {
        quantity: productQuantity - 1,
      }).then(() => {
        console.log("Changed quantity");
      });
    }
  };

  const deletecartitem = async () => {
    await deleteDoc(doc(db, `cart-${userid}`, `${itemdata.id}`))
      .then(() => {
        console.log("Document deleted");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <div className="cart-prod-container">
        <div className="cart-prod-imgtitle">
          <div className="prod-image">
            <img src={itemdata.product.productImg} />
          </div>
          <div className="prod-title">{itemdata.product.productTitle}</div>
        </div>
        <div className="prodquantity-div">
          <button onClick={increasequantity}>+</button>
          <p>{productQuantity}</p>
          <button onClick={decreaseQuantity}>-</button>
        </div>
        <div className="prodprice">Rs {saleprice}</div>
        <button className="deletebtn" onClick={deletecartitem}>
          <img src={button} />
        </button>
      </div>
    </div>
  );
};

export default CartCard;
