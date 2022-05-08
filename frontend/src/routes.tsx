import React from 'react'
import { Routes, Route } from "react-router-dom";

import { Home, Comandas } from './pages';

const Router = () => {
  
  return (
    <Routes>
      <Route path="/" element={<Home/>}/> 
      <Route path="/garcom/comandas" element={<Comandas/>}/> 
      <Route path="/caixa/comandas" element={<Comandas/>}/> 
    </Routes>
  );
};

export default Router;