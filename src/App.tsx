import { useEffect, useState } from "react";
import Home from "./componens/Home";
import {GrCircleInformation} from "react-icons/gr"
import DisplayInfo from "./componens/DisplayInfo";
import React from "react";

function App() {
  const [isLogin,setIsLogin] = useState();
  const [displayInfo, setDisplayInfo] = useState(false);
  const [videoID, setVideoID] = useState('loading...');
  const [videoChannel, setVideoChannel] = useState('loading...');
 



  useEffect(() => {
    if(chrome.tabs)
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      setVideoID(tabs[0]?.url?.split("watch?v=")[1].split("&")[0] || "loading");
      setVideoChannel(tabs[0]?.url?.split("channel=")[1].split("-Topic")[0] || "loading");
    });
     }, []);

 
  const userLogin = async() => {
    console.log("Fubction called");
  }
  const url ='https://accounts.spotify.com/authorize?response_type=code&client_id=d8afb85cb8a443ebaf7a6684ca436c7b&scope=user-read-private user-read-email playlist-modify-public playlist-modify-private&redirect_uri=http://localhost:3000/'
  


  return (
    
    <div className="App bg-base w-[320px] h-[480px] rounded-lg text-center text-[30px] font-semibold text-[#000000]  ">
      <h1 className=" inline-block">Spotify adder <span> <GrCircleInformation className="relative right-[-40px] inline-block w-4 h-4" onClick={ () => { setDisplayInfo(!displayInfo)}} /></span></h1>
      {
        displayInfo ? 
        <DisplayInfo/>
        :
        <></>
      }
    {/* {
      isLogin ?  */}
      <Home videoID={videoID} channel={'coldplay'}/>
      {/* : */}
      <div>LoginForm
      <a href={url} target='_blank'>  <button className='btn' onClick={() => {userLogin();  }}> Login</button>
</a>
    </div>
    {/* } */}
    </div>
  );
}

export default App;
