/*global browser*/
import axios from "axios";
import { useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, setDoc, getDocs, collection, addDoc, updateDoc } from "firebase/firestore"; 


function Home({ videoID, channel}) {
    const [subject,setSubject] = useState("");
    const [videoTitle, setVideoTitle] = useState("Sparks");
    const [code,setCode] = useState("codeNotFound");
    const [userID, setUserID] = useState("");
    const [trackID, setTrackID] = useState("");
    const [playlistID, setPlaylistID] = useState("");

    
    const search = '?x=10&y=10' // value of window.location.search
    const params = new URLSearchParams(search);
    console.log("params",params.get('code') );
    const userCollectionRef = collection(db,"SPAD");


    useEffect(  () => {
      const getTitle = async () => {
        const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoID}&key=${process.env.REACT_APP_YOUTUBE_API}&part=snippet`;
      const  { data }   = await axios.get(url);
      if(data.items[0])
      setVideoTitle(data.items[0].snippet.localized.title.toString() || "none");
      }  

      getTitle();



        },[videoTitle,videoID])
    
      const getUserID = async()=> {
        const header = {
          headers:
          {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer BQBch6wXR4PB8zN-ZDHxQsn3hqF8kEHt2DRsz6NtqJTzD4l1PTyBs71-dHIllft2GJLLPzljjpKQA3S6orsHb6IYn88JbIwChTUckWl2MlxFLvn7auQcS-2EbdtjCOJOsKzQqfdCG1x2vhsPvGUNEiHJqq2745E1QhQQkPNypmsno6TO-7ZNBh12Yr1gtNgML7Ml-nXvaYqORWU641ULDTux9z_kv3SeP7s_MmEyiFOdE2-iHTeFHv2EHiJCC55RmvfuDoEfkPVKWikk'
          }
        }

        const { data } = await axios.get('https://api.spotify.com/v1/me',header) 
        console.log("USER ID", data.id);
        setUserID(data.id);
      }
      

      const getSpotifyID = async()=> {
        const header = {
          headers:
          {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer BQBch6wXR4PB8zN-ZDHxQsn3hqF8kEHt2DRsz6NtqJTzD4l1PTyBs71-dHIllft2GJLLPzljjpKQA3S6orsHb6IYn88JbIwChTUckWl2MlxFLvn7auQcS-2EbdtjCOJOsKzQqfdCG1x2vhsPvGUNEiHJqq2745E1QhQQkPNypmsno6TO-7ZNBh12Yr1gtNgML7Ml-nXvaYqORWU641ULDTux9z_kv3SeP7s_MmEyiFOdE2-iHTeFHv2EHiJCC55RmvfuDoEfkPVKWikk'
          }
        }
        const { data } = await axios.get(`https://api.spotify.com/v1/search?q=track:${videoTitle}%20artist:${channel}&type=track`, header )
        const arr =data.tracks.items;
        const trackID = arr[ arr.length - 1].id
        setTrackID(trackID);
      }
    
      const createAPlaylist = async()=> {

        const body = {
          "name": "Spotify Adder",
          "description": "To add music to spotify from youtube",
          "public": false
      }
      const header = {
        headers:
        {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer BQBch6wXR4PB8zN-ZDHxQsn3hqF8kEHt2DRsz6NtqJTzD4l1PTyBs71-dHIllft2GJLLPzljjpKQA3S6orsHb6IYn88JbIwChTUckWl2MlxFLvn7auQcS-2EbdtjCOJOsKzQqfdCG1x2vhsPvGUNEiHJqq2745E1QhQQkPNypmsno6TO-7ZNBh12Yr1gtNgML7Ml-nXvaYqORWU641ULDTux9z_kv3SeP7s_MmEyiFOdE2-iHTeFHv2EHiJCC55RmvfuDoEfkPVKWikk'
        }
      }

      const { data } = await axios.post(`https://api.spotify.com/v1/users/${userID}/playlists`,body, header)
      console.log(data.id)
      setPlaylistID(data.id);

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
          'Authorization': 'Bearer BQBch6wXR4PB8zN-ZDHxQsn3hqF8kEHt2DRsz6NtqJTzD4l1PTyBs71-dHIllft2GJLLPzljjpKQA3S6orsHb6IYn88JbIwChTUckWl2MlxFLvn7auQcS-2EbdtjCOJOsKzQqfdCG1x2vhsPvGUNEiHJqq2745E1QhQQkPNypmsno6TO-7ZNBh12Yr1gtNgML7Ml-nXvaYqORWU641ULDTux9z_kv3SeP7s_MmEyiFOdE2-iHTeFHv2EHiJCC55RmvfuDoEfkPVKWikk'
        }
      }

        const response = await axios.post(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`,body, header)
        console.log(response);
      }

      // get user

      const getUser = async ( ) => {
        const data = await getDocs(userCollectionRef);
        data.docs.map(doc => {
          console.log('LOG 1', doc.data());
      })
    }

      // Create a  user

      const createUser = async() => {
        await addDoc(userCollectionRef, { name: "Tanmay", email:"mail-1"})
    }

    // Update User
      // const updateUser = async(id) => {
      //   const userDoc = doc(db, "SPAD", id)
      //   await updateDoc(userDoc, {collectionID: "id"});
      // }

      
  return (
    <div>
      <div className="form-control w-full max-w-xs">
        <form>  
        <label className="label">
          <span className="label-text">Search</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs text-[#ffffff]"
          value={subject}
          onChange={ (e:any) => { setSubject(e.target.value); }}
    
          
    />
        <button className="btn" onClick={ () => {}}>Search</button>
        </form>
        <p>Title: {videoTitle}</p>
        <button className="btn" onClick={ () => {getUserID();}}> get User ID</button>
        <p>{userID}</p>


        <button className="btn" onClick={ () => {getSpotifyID();}}> get spotify ID</button>
        <p>{trackID}</p>

        <button className="btn" onClick={ () => {createAPlaylist();}}> Create A playlist</button>
        <p>{playlistID}</p>


        <button className="btn" onClick={ () => {addTrack();}}> Add Track</button>
        <button className="btn" onClick={ () => {getUser();}}> Get User</button>

        <button className="btn" onClick={ () => {createUser();}}> Create User</button>





      </div>
    </div>
  );  
}

export default Home;
