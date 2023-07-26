import axios from 'axios'
import React from 'react'

function LoginForm() {
  
  const userLogin = async() => {
    console.log("Fubction called");
  }
  const url ='https://accounts.spotify.com/authorize?response_type=code&client_id=d8afb85cb8a443ebaf7a6684ca436c7b&scope=user-read-private user-read-email playlist-modify-public playlist-modify-private&redirect_uri=http://localhost:3000/'

  
  return (
    <div>LoginForm
      <a href={url} target='_blank'>  <button className='btn' onClick={() => {userLogin(); }}> Login</button>
</a>
    </div>
  )
}

export default LoginForm