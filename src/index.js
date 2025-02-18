import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import Navbar from "./components/Navbar";


// Create a root and render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Navbar/> */}
    <App />
  </React.StrictMode>
);
