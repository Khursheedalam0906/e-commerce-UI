import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../Firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import "./Specificproductpage.css";
import ProductSlider from "./product-components/ProductSlider";

const Specificproductpage = () => {
  const { id, type } = useParams();
  const [product, setProduct] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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

  const GetCurrentProduct = () => {
    useEffect(() => {
      const getProduct = async () => {
        const docRef = doc(db, `products-${type.toUpperCase()}`, id);
        const docSnap = await getDoc(docRef);
        setProduct(docSnap.data());
      };
      getProduct();
    }, []);
    return product;
  };

  const productData = GetCurrentProduct();

  const addtocart = () => {
    if (loggeduser) {
      addDoc(collection(db, `cart-${loggeduser[0].uid}`), {
        product,
        quantity: 1,
      })
        .then(() => {
          setSuccessMsg("Product added to cart");
        })
        .catch((error) => {
          setErrorMsg(error.message);
        });
    } else {
      setErrorMsg("You need to login first");
    }
  };

  let overalltax = 10 / 100;
  let overcommission = 10 / 100;
  let extraforfun = 10 / 100;

  let mrp = parseInt(product.price);
  mrp = mrp + overalltax * mrp + overcommission * mrp + extraforfun * mrp;
  const saleprice = mrp - extraforfun * mrp;

  return (
    <div>
      <Navbar />
      {product ? (
        <div className="myprod-container">
          <div className="prod-img-cont">
            <img src={product.productImg} />
          </div>
          <div className="prod-data">
            <p className="prod-head">{product.productTitle}</p>
            <p className="prod-head">{product.keyspecs}</p>
            <div>
              <p className="mrp">
                MRP: <p className="rate">Rs:{mrp}</p>
              </p>
              <p className="saleprice">
                Discount Price : <p className="rate">Rs{saleprice}</p>
              </p>
              <p className="yousave">You Save : {mrp - saleprice}</p>
            </div>
            <p className="prod-details-head">Details</p>
            <p className="prod-description">{product.description}</p>
            <div className="row-cont">
              <div className="warranty-replacement">
                <div className="cod">
                  <div className="img-circle">
                    <img src="https://www.creativefabrica.com/wp-content/uploads/2019/02/Money-dollar-payment-logo-vector-by-Mansel-Brist-580x406.jpg" />
                  </div>
                  <p>Cash on Delivery</p>
                </div>
                <div className="warranty">
                  <div className="img-circle">
                    <img src="https://beautysmartcare.com/wp-content/uploads/2020/09/irestore-professional-scaled.jpg" />
                  </div>
                  <p>Warranty : {product.warranty}</p>
                </div>
                <div className="replacement">
                  <div className="img-circle">
                    <img src="https://icon-library.com/images/change-icon-png/change-icon-png-26.jpg" />
                  </div>
                  <p>10 Days replacement</p>
                </div>
              </div>
            </div>
            <div className="buy-cart">
              <button className="btn">Buy Now</button>
              <button className="btn" onClick={addtocart}>
                Add to cart
              </button>
            </div>
            {successMsg && (
              <>
                <div className="success-msg">{successMsg}</div>
              </>
            )}
            {errorMsg && (
              <>
                <div className="error-msg">{errorMsg}</div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <p className="prod-details-head2">Similar Items</p>
      <ProductSlider type={type}></ProductSlider>
    </div>
  );
};

export default Specificproductpage;
