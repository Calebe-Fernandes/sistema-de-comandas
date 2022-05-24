import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from "react-router-dom";
import Routes from './routes'

function App() {
  return (
    <BrowserRouter>
        <Routes />
        <ToastContainer />
    </BrowserRouter>
  );
}

export default App;