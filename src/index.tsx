import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Profile from './pages/profile';

// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//       <Route path="/" element={<App />} />    
//       <Route path="/profile" element={<Profile />} />    
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>
// );
