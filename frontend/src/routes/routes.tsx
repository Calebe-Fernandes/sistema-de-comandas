import React from 'react'
import { Routes, Route } from "react-router-dom";

import { Home, Comandas, Estoque, HistóricoCaixa, HistóricoGerente, NovaComanda, MenuProdutos, Login} from '../pages';
import DetalheComanda from '../pages/DetalheComanda';
import { ProtectedRoute } from './ProtectedRoute';

const Router = () => {
  
  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/> 
        <Route path="/garcom/comandas" element={<ProtectedRoute><Comandas/></ProtectedRoute>}/>
        <Route path="/garcom/comandas/nova_comanda" element={<ProtectedRoute><NovaComanda/></ProtectedRoute>}/>
        <Route path="/garcom/comandas/detalhes/:id" element={<ProtectedRoute><DetalheComanda/></ProtectedRoute>} />
        <Route path="/garcom/comandas/detalhes/menu/:id" element={<MenuProdutos/>} />   
        <Route path="/caixa/comandas" element={<ProtectedRoute><Comandas/></ProtectedRoute>}/>
        <Route path="/caixa/comandas/detalhes/:id" element={<ProtectedRoute><DetalheComanda/></ProtectedRoute>} />  
        <Route path="/estoque" element={<ProtectedRoute><Estoque/></ProtectedRoute>}/>  
        <Route path="caixa/historico" element={<ProtectedRoute><HistóricoCaixa/></ProtectedRoute>}/>  
        <Route path="gerente/historico" element={<ProtectedRoute><HistóricoGerente/></ProtectedRoute>}/>
    </Routes>
  );
};

export default Router;