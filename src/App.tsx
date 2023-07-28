import { Profiler, useEffect, useState } from "react";
import Home from "./componens/Home";
import { GrCircleInformation } from "react-icons/gr";
import DisplayInfo from "./componens/DisplayInfo";
import React from "react";
import Profile from "./pages/profile";
import LoginForm from "./componens/LoginForm";

function App() {
  const [isLogin, setIsLogin] = useState();
  const [displayInfo, setDisplayInfo] = useState(false);
  const [videoID, setVideoID] = useState("loading...");
  const [videoChannel, setVideoChannel] = useState("loading...");
  const [code, setCode] = useState("codeNotFound");

  useEffect(() => {
    if (chrome.tabs)
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        setVideoID(
          tabs[0]?.url?.split("watch?v=")[1].split("&")[0] || "loading"
        );
        setVideoChannel(
          tabs[0]?.url?.split("channel=")[1].split("-Topic")[0] || "loading"
        );
      });

    const urlParams = new URLSearchParams(window.location.search);
    const codeValue = urlParams.get("code") || "codeNotFound";
    setCode(codeValue);
  }, []);

  const userLogin = async () => {
    console.log("Fubction called");
  };
  
  return (
    <div>
      {code !== "codeNotFound" ? (
        <Profile code={code} />
      ) : (
        <>
          <div className=" bg-base w-[320px] h-[480px] rounded-lg text-center text-[30px] font-semibold text-[#000000]  ">
            <h1 className=" inline-block">
              Spotify adder{" "}
              <span>
                {" "}
                <GrCircleInformation
                  className="relative right-[-40px] inline-block w-4 h-4"
                  onClick={() => {
                    setDisplayInfo(!displayInfo);
                  }}
                />
              </span>
            </h1>
            {displayInfo ? <DisplayInfo /> : <></>}
            {isLogin ? (
              <Home videoID={videoID} channel={"coldplay"} />
            ) : (
              <LoginForm />
             
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
