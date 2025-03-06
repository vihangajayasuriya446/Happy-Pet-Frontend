import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import Navbar from "./components/Navbar";

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    {/* <Navbar/> */}
    <App />
  </React.StrictMode>
);
