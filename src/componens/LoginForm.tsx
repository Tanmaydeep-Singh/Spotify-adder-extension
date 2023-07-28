import axios from "axios";
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const checkUser = async (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        if (user) props.onData(true);
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
