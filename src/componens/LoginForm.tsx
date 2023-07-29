import axios from "axios";
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [userID, setUserID] = useState("");
  const [playlistID, setPlaylistID] = useState("");
  const auth = getAuth();

  const getAccessToken = async (refreshToken) => {
    console.log("REFERESHTOKEN",refreshToken);

     const header = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ZDhhZmI4NWNiOGE0NDNlYmFmN2E2Njg0Y2E0MzZjN2I6NTAzOTIwZWJmOGJjNDVlODg1NGY0MjM4NDhmZmEwZTg=`,
          },
        };

    const body = {
      "refresh_token": refreshToken,
      "grant_type":"refresh_token"
    };
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      body,
      header
    );
    console.log("RESPONSE", response);

    if( response.status)
    {
      props.onData(true);
    }
  };

  const checkUser = async (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log("user ID", user.uid);

        const docRef = doc(db, "SPAD", user.uid);
        const docSnap = await getDoc(docRef);
        const userData = docSnap.data();

        if (userData) {
          console.log("userData", userData);
          console.log("userData", userData.refreshToken);
          setRefreshToken(userData.refreshToken);
          getAccessToken(userData.refreshToken);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
      <h1 className="text-3xl font-semibold text-center text-purple-700">
        Login
      </h1>
      <form className="">
        <div>
          <label className="label">
            <span className="  text-[#000000] ">Email</span>
          </label>
          <input
            type="text"
            placeholder="Email Address"
            className="w-full input input-bordered input-primary bg-[#ffffff]"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label className="label">
            <span className="text-[#000000] ">Password</span>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full input input-bordered input-primary bg-[#ffffff]"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <a
          href="#"
          className="text-xs text-gray-600 hover:underline hover:text-blue-600"
        >
          Forget Password?
        </a>
        <div>
          <button
            className="btn"
            onClick={(e) => {
              checkUser(e);
            }}
          >
            Login
          </button>
        </div>
        {/* signup */}
        <div>
          <a
            href={
              "https://accounts.spotify.com/authorize?response_type=code&client_id=d8afb85cb8a443ebaf7a6684ca436c7b&scope=user-read-private user-read-email playlist-modify-public playlist-modify-private&redirect_uri=http://localhost:3000/"
            }
            target="_blank"
            className="btn"
          >
            {" "}
            Signup
          </a>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
