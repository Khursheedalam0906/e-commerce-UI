import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db, storage } from "../Firebase/firebaseConfig";
import "./Addproduct.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Watch } from "react-loader-spinner";

const Addproduct = () => {
  const [loading, setLoading] = useState(false);

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

  const [productTitle, setProductTitle] = useState("");
  const [productType, setProductType] = useState("");
  const [keyspacs, setKeySpacs] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [customerSupport, setCustomerSupport] = useState("");
  const [price, setPrice] = useState("");
  const [warranty, setWarranty] = useState("");
  const [productImg, setProductImg] = useState(null);

  const [imageError, setImageError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [uploadError, setUploadMsg] = useState("");

  const types = ["image/jpg", "image/jpeg", "image/png", "image/webp"];
  const handleProductImg = (e) => {
    e.preventDefault();
    let selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setProductImg(selectedFile);
        setImageError("");
        alert("Image uploaded Sucessfully");
      } else {
        setProductImg(null);
        setImageError(
          "Please select a valid image file type (png, jpg, jpeg & webp)"
        );
      }
    } else {
      setImageError("Please select your file");
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    setLoading(true);
    const storageRef = ref(
      storage,
      `product-images-${productType.toUpperCase()}/${Date.now()}`
    );
    uploadBytes(storageRef, productImg)
      .then(() => {
        getDownloadURL(storageRef)
          .then((url) => {
            addDoc(collection(db, `products-${productType.toUpperCase()}`), {
              productTitle,
              productType,
              keyspacs,
              description,
              brand,
              customerSupport,
              price,
              warranty,
              productImg: url,
            });
            setLoading(false);
            setProductTitle("");
            setProductType("");
            setDescription("");
            setKeySpacs("");
            setBrand("");
            setCustomerSupport("");
            setPrice("");
            setWarranty("");
            setProductImg(null);
            alert("data added successfully");
          })
          .catch((error) => {
            // console.log(error.message);
            alert("data not save");
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <Navbar />
      {loggeduser && loggeduser[0]?.email == "khursheedalam0906@gmail.com" ? (
        <div className="addproduct-container">
          <form className="addproduct-form" onSubmit={handleAddProduct}>
            <p className="addproduct-title">Add Product</p>
            <Watch
              visible={loading}
              height="80"
              width="80"
              radius="48"
              color="yellow"
              ariaLabel="watch-loading"
              wrapperStyle={{}}
              wrapperClass="wrapper-class"
              style={{}}
            />
            {successMsg && <div className="success-msg">{successMsg}</div>}
            {uploadError && <div className="error-msg">{uploadError}</div>}
            <label>Product Title : </label>
            <input
              type="text"
              value={productTitle}
              placeholder="Product Title"
              onChange={(e) => setProductTitle(e.target.value)}
            />
            <label>Product Type :</label>
            <input
              type="text"
              value={productType}
              placeholder="Product Type"
              onChange={(e) => setProductType(e.target.value)}
            />
            <label>Brand Name: </label>
            <input
              type="text"
              value={brand}
              placeholder="Brand Name"
              onChange={(e) => setBrand(e.target.value)}
            />
            <label>Warranty : </label>
            <input
              type="text"
              value={warranty}
              placeholder="Product Warranty"
              onChange={(e) => setWarranty(e.target.value)}
            />

            <label>Product Image : </label>
            <input
              type="file"
              // value={productImg}
              placeholder="Product Image"
              onChange={handleProductImg}
            />
            <label>Key Specification : </label>
            <textarea
              type="text"
              value={price}
              placeholder="Enter some key specifications"
              onChange={(e) => setKeySpacs(e.target.value)}
            />
            <label>Product Description : </label>
            <textarea
              value={description}
              placeholder="Description your product in brief"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <label>Price : </label>
            <input
              type="number"
              value={price}
              placeholder="Enter price without text"
              onChange={(e) => setPrice(e.target.value)}
            />
            <label>Customer Support : </label>
            <input
              type="text"
              value={customerSupport}
              placeholder="Customer Support Email, Phone or address"
              onChange={(e) => setCustomerSupport(e.target.value)}
            />
            {imageError && (
              <>
                <div className="error-msg">{imageError}</div>
              </>
            )}
            <button type="submit">Add</button>
          </form>
        </div>
      ) : (
        <div>You don't have access to add product</div>
      )}
    </div>
  );
};

export default Addproduct;
