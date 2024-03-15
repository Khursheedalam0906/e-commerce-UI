import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../Firebase/firebaseConfig";
import "./Profile.css";
import { Link } from "react-router-dom";

const Profile = () => {
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

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div>
      <Navbar />
      <div className="userprofile-outercontainer">
        {loggeduser ? (
          <div>
            <div className="user-profile">
              <p>Your Account Details</p>
              <div className="data-row">
                <span>Your Name : </span>
                <span>{loggeduser[0]?.username}</span>
              </div>
              <div className="data-row">
                <span>Your Email : </span>
                <span>{loggeduser[0]?.email}</span>
              </div>
              <div className="data-row">
                <span>Your Phone : </span>
                <span>{loggeduser[0]?.phoneNumber}</span>
              </div>
              <div className="data-row">
                <span>Your Address : </span>
                <span>{loggeduser[0]?.address}</span>
              </div>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
            {loggeduser &&
            loggeduser[0]?.email === "khursheedalam0906@gmail.com" ? (
              <Link to="/sellerproduct">
                <button>AddProduct</button>
              </Link>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <div>
            <h3>You are not Logged, Please Login</h3>
            <Link to="/signup">
              <button>Register</button>
            </Link>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
