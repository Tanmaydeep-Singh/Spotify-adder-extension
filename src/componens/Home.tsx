/*global browser*/
import axios from "axios";
import { useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, setDoc, getDocs, collection, addDoc, updateDoc } from "firebase/firestore"; 


function Home({ videoID, body}) {
    const [subject,setSubject] = useState("");
    const [videoTitle, setVideoTitle] = useState("");
    const [code,setCode] = useState("codeNotFound");
    const [channel,setChannel] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [userID, setUserID] = useState("");
    const [trackID, setTrackID] = useState("");
    const [playlistID, setPlaylistID] = useState("");

    
    const urlParams = new URLSearchParams(window.location.search);
    const codeValue = urlParams.get("code") || ""; 
    console.log("params",codeValue );
    const userCollectionRef = collection(db,"SPAD");


    useEffect(  () => {
      const getTitle = async () => {
      const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoID}&key=${process.env.REACT_APP_YOUTUBE_API}&part=snippet`;
      const  { data }   = await axios.get(url);
      if(data.items[0])
      {
      const currentChannel = data.items[0].snippet.channelTitle.toString();
      const currentTitle = data.items[0].snippet.localized.title.toString();
      if( currentTitle.includes('-'))
      { 
        const title  = currentTitle.split("-")[1];

        if( title.includes("("))
        {
          const titleWithoutParanthesis = title.split("(")[0];
          setVideoTitle(titleWithoutParanthesis);
        }
        else
        {
          setVideoTitle( title || "none");
        }
      }
      else
      {
        setVideoTitle( currentTitle || "none");
      }

      if(currentChannel.includes("-"))
      {
        const channelWithoutDash = currentChannel.split('-')[0]
        setChannel(channelWithoutDash);
      } 
      else
      {
        setChannel(currentChannel)
      }
    }
    }
      getTitle();

      
      setAccessToken(body.accessToken);
      setUserID(body.userID);
      setPlaylistID(body.playlistID);
    
        },[videoTitle,videoID,accessToken,userID,playlistID])
   
      

      const getSpotifyID = async()=> {
        const header = {
          headers:
          {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        }
        const { data } = await axios.get(`https://api.spotify.com/v1/search?q=track:${videoTitle}%20artist:${channel}&type=track`, header )
        console.log(`https://api.spotify.com/v1/search?q=track:${videoTitle}%20artist:${channel}&type=track`)
        const arr =data.tracks.items;
        const trackID = arr[ arr.length - 1].id
        setTrackID(trackID);
      }
    
   
      const addTrack = async()=> {

        const body = {
          "uris": [
                  `spotify:track:${trackID}`
          ],
          "position": 0
      }
      const header = {
        headers:
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      }

        const response = await axios.post(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`,body, header)
        console.log(response);
      }

      

      
   

    // Update User
      // const updateUser = async(id) => {
      //   const userDoc = doc(db, "SPAD", id)
      //   await updateDoc(userDoc, {collectionID: "id"});
      // }

      
  return (
    <div>
      <div className="form-control ">
        <p>Title: {videoTitle}</p>
        <p>Channel: {channel}</p>

       
       <div>

        <button className="btn" onClick={ () => {getSpotifyID();}}> get spotify ID</button>
        <p>{trackID}</p>

       

        <button className="btn bg-[#E87121] text-[#000000]" onClick={ () => {addTrack();}}> Add Track</button>
        

        </div>




      </div>
    </div>
  );  
}

export default Home;
