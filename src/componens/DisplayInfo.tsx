import React from "react";
import { MdCancel } from "react-icons/md";

function DisplayInfo(props) {
  return (
    <div className="absolute w-[320px] top-[80px]">
      <div className=" relative w-[300px] h-[300px] bg-[#ffffff] rounded-lg  m-auto z-20  ">
        <h1 className="relative">
        About
        </h1>
        <span >
          {" "}
          <MdCancel
            className="absolute top-[15px] right-[20px] inline-block w-5 h-5"
            onClick={() => {
              props.onData({ status: false });
            }}
          />
            <p className=" text-[17px] mx-8 my-4">
        Log in to the extension and direct for the song on YouTube that
        you wish to add to your Spotify playlist. By doing so, you'll be able to
        add it to your Spotify and enjoy listening to it seamlessly.
      </p>
        </span>{" "}

      </div>
    
    </div>
  );
}

export default DisplayInfo;
