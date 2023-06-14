import React from 'react'
import { Routes, Route } from "react-router-dom";

import { Home, Comandas, Estoque, HistóricoCaixa, HistóricoGerente, NovaComanda, MenuProdutos, Login , QuadroUsuarios, AnaliseVendas, Administracao} from '../pages';
import DetalheComanda from '../pages/DetalheComanda';
import { ProtectedAdminRoute } from './ProtectedAdminRoute';
import { ProtectedWaiterRoute } from './protectedWaiterRoute';

const Router = () => {
  
  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<Home/>}/> 
      <Route path="/garcom/comandas" element={<ProtectedWaiterRoute><Comandas/></ProtectedWaiterRoute>}/>
      <Route path="/garcom/comandas/nova_comanda" element={<ProtectedWaiterRoute><NovaComanda/></ProtectedWaiterRoute>}/>
      <Route path="/garcom/comandas/detalhes/:id" element={<ProtectedWaiterRoute><DetalheComanda/></ProtectedWaiterRoute>} />
      <Route path="/garcom/comandas/detalhes/menu/:id" element={<MenuProdutos/>}/>   
      <Route path="/caixa/comandas" element={<Comandas/>}/>
      <Route path="/caixa/comandas/detalhes/:id" element={<DetalheComanda/>}/>  
      <Route path="/estoque" element={<Estoque/>}/>  
      <Route path="caixa/historico" element={<HistóricoCaixa/>}/>  
      <Route path="gerente/historico" element={<HistóricoGerente/>}/>
      <Route path="/adm/quadro_de_usuarios" element={<ProtectedAdminRoute><QuadroUsuarios/></ProtectedAdminRoute>}/>
      <Route path="/adm/analise_de_vendas" element={<ProtectedAdminRoute><AnaliseVendas/></ProtectedAdminRoute>}/>
      <Route path="/adm" element={<ProtectedAdminRoute><Administracao/></ProtectedAdminRoute>}/>
    </Routes>
  );
};

export default Router;