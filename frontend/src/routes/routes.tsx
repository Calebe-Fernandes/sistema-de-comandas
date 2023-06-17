import React from 'react'
import { Routes, Route } from "react-router-dom";

import {Comandas, Estoque, HistóricoCaixa, HistóricoGerente, NovaComanda, MenuProdutos, Login , QuadroUsuarios, AnaliseVendas, Administracao} from '../pages';
import DetalheComanda from '../pages/DetalheComanda';
import { ProtectedAdminRoute } from './ProtectedAdminRoute';
import { ProtectedWaiterRoute } from './protectedWaiterRoute';
import { ProtectedCashierRoute } from './protectedCashierRoute';
import {   ProtectedManagerRoute } from './protectedManagerRoute';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/> 
      <Route path="/garcom/comandas" element={<ProtectedWaiterRoute><Comandas/></ProtectedWaiterRoute>}/>
      <Route path="/garcom/comandas/nova_comanda" element={<ProtectedWaiterRoute><NovaComanda/></ProtectedWaiterRoute>}/>
      <Route path="/garcom/comandas/detalhes/:id" element={<ProtectedWaiterRoute><DetalheComanda/></ProtectedWaiterRoute>} />
      <Route path="/garcom/comandas/detalhes/menu/:id" element={<ProtectedWaiterRoute><MenuProdutos/></ProtectedWaiterRoute>}/>   
      <Route path="/caixa/comandas" element={<ProtectedCashierRoute><Comandas/></ProtectedCashierRoute>}/>
      <Route path="/caixa/comandas/detalhes/:id" element={<ProtectedCashierRoute><DetalheComanda/></ProtectedCashierRoute>}/>  
      <Route path="/estoque" element={<ProtectedManagerRoute><Estoque/></ProtectedManagerRoute>}/>  
      <Route path="/caixa/historico" element={<ProtectedCashierRoute><HistóricoCaixa/></ProtectedCashierRoute>}/>  
      <Route path="/gerente/historico" element={<ProtectedManagerRoute><HistóricoGerente/></ProtectedManagerRoute>}/>
      <Route path="/adm/quadro_de_usuarios" element={<ProtectedAdminRoute><QuadroUsuarios/></ProtectedAdminRoute>}/>
      <Route path="/adm/analise_de_vendas" element={<ProtectedAdminRoute><AnaliseVendas/></ProtectedAdminRoute>}/>
      <Route path="/adm" element={<ProtectedAdminRoute><Administracao/></ProtectedAdminRoute>}/>
    </Routes>
  );
};

export default Router;