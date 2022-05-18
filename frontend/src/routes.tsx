import React from 'react'
import { Routes, Route } from "react-router-dom";

import { Home, Comandas, Estoque, Histórico} from './pages';

const Router = () => {
  
  return (
    <Routes>
      <Route path="/" element={<Home/>}/> 
      <Route path="/garcom/comandas" element={<Comandas/>}/> 
      <Route path="/caixa/comandas" element={<Comandas/>}/>
      <Route path="/estoque" element={<Estoque/>}/>  
      <Route path="/historico" element={<Histórico/>}/>  
    </Routes>
  );
};

export default Router;