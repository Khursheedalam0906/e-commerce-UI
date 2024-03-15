import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        const initialcartvalue = 0;
        //  console.log(user);
        addDoc(collection(db, "users"), {
          username: userName,
          email: email,
          password: password,
          phoneNumber: phoneNumber,
          address: address,
          cart: initialcartvalue,
          uid: user.uid,
        })
          .then(() => {
            setSuccessMsg(
              "New user added successfully, you will now automatically redirected to login page"
            );
            setUserName("");
            setEmail("");
            setPassword("");
            setPhoneNumber("");
            setAddress("");
            setErrorMsg("");
            setTimeout(() => {
              setSuccessMsg("");
              navigate("/login");
            }, 4000);
          })
          .catch((error) => {
            setErrorMsg(error.message);
          });
      })
      .catch((error) => {
        if (
          error.message === "Firebase: Error (auth/network-request-failed)."
        ) {
          setErrorMsg("Network request failed");
        }
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          setErrorMsg("Email already in use.");
        }
        if (error.message === "Firebase: Error (auth/invalid-email).") {
          setErrorMsg("Please fill all the fields");
        }
      });
  };

  return (
    <div>
      <Navbar />
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <p>Create Account</p>
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
          <label>Your Name : </label>
          <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => setUserName(e.target.value)}
          />
          <label>Email : </label>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password : </label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Mobile No : </label>
          <input
            type="text"
            placeholder="Mobile No"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <label>Address : </label>
          <input
            type="text"
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <button type="submit">Sign up</button>
          <div>
            <span>Already have an account </span>
            <Link to="/login">Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
