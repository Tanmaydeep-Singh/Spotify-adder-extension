import React from 'react'
import {MdCancel} from "react-icons/md";

function DisplayInfo() {
  return (
    <div className='absolute w-[320px]'>
    <div className=' relative w-[300px] h-[300px] bg-[#ffffff] rounded-lg  m-auto z-20 '>DisplayInfo <span> <MdCancel className="relative right-[-40px] inline-block w-5 h-5"  /></span> </div>
    </div>
  )
}

export default DisplayInfo