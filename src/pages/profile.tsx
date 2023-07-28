import axios from "axios";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function Profile({ code }) {
  // States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [userID, setUserID] = useState("");
  const [playlistID, setPlaylistID] = useState("");
  const auth = getAuth();

  useEffect(() => {
    const getUserID = async (access_token) => {
      const header = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      };
      const { data } = await axios.get("https://api.spotify.com/v1/me", header);
      setUserID(data.id);
      createAPlaylist(data.id, access_token);
    };

    const createAPlaylist = async (userID, access_token) => {
      const body = {
        name: "Spotify Adder",
        description: "To add music to spotify from youtube",
        public: false,
      };
      const header = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      };

      const { data } = await axios.post(
        `https://api.spotify.com/v1/users/${userID}/playlists`,
        body,
        header
      );
      setPlaylistID(data.id);
    };

    const getTokens = async () => {
      try {
        const header = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ZDhhZmI4NWNiOGE0NDNlYmFmN2E2Njg0Y2E0MzZjN2I6NTAzOTIwZWJmOGJjNDVlODg1NGY0MjM4NDhmZmEwZTg=`,
          },
        };

        const body = {
          grant_type: "authorization_code",
          code: code,
          redirect_uri: "http://localhost:3000/",
        };

        const { data } = await axios.post(
          "https://accounts.spotify.com/api/token",
          body,
          header
        );
        setRefreshToken(data.refresh_token);
        setAccessToken(data.access_token);

        if (data.access_token) {
          getUserID(data.access_token);
        }
      } catch (error) {}
    };

    getTokens();
  }, [refreshToken]);

  const submitSignupForm = async (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then( async(userCredential) => {
        const user = userCredential.user;
        const userCollectionRef = doc(db, "SPAD",user.uid);

        const response = await setDoc(userCollectionRef, {
          name: name,
          email: email,
          refreshToken: refreshToken,
          userID: userID,
          playlistID: playlistID,
        },);
    
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

  
  };

  return (
    <div className="h-full w-full bg-base ">
      Profile
      <p className=" w-[100px] overflow-clip">{code}</p>
      <div className="w-full p-6 m-auto bg-white rounded-md  ring-gray-800/50 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-gray-700">
          SIGNUP
        </h1>
        <form className="space-y-4">
          <div>
            <label className="label">
              <span className="text-base label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              className="w-full input input-bordered input-primary bg-[#ffffff] text-[#000000]"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Email Address"
              className="w-full input input-bordered input-primary bg-[#ffffff] text-[#000000]"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered input-primary bg-[#ffffff] text-[#000000]"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div>
            <button
              className="btn btn-block"
              onClick={(e) => {
                submitSignupForm(e);
              }}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
