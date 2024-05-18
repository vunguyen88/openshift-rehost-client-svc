import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { SoftUIControllerProvider } from "./context/index.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <SoftUIControllerProvider>
        <App />
      </SoftUIControllerProvider>
    </React.StrictMode>,
  </BrowserRouter>
)
