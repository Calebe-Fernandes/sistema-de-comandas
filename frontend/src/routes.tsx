import React from 'react'
import { Routes, Route } from "react-router-dom";

import { Home, Comandas, NovaComanda } from './pages';

const Router = () => {
  
  return (
    <Routes>
      <Route path="/" element={<Home/>}/> 
      <Route path="/garcom/comandas" element={<Comandas/>}/> 
      <Route path="/caixa/comandas" element={<Comandas/>}/> 
      <Route path="/garcom/comandas/nova_comanda" element={<NovaComanda/>}/> 
    </Routes>
  );
};

export default Router;