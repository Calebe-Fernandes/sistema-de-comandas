import React from 'react'
import { Routes, Route } from "react-router-dom";

import { 
  Home,
  Comandas,
  NovaComanda,
  MenuProdutos,
  HistóricoCaixa,
  HistóricoGerente,
  Estoque,
  Administracao,
  QuadroUsuarios
} from './pages';
import DetalheComanda from './pages/DetalheComanda';

const Router = () => {
  
  return (
    <Routes>
      <Route path="/" element={<Administracao/>}/>
      <Route path="/garcom/comandas" element={<Comandas/>}/>
      <Route path="/garcom/comandas/nova_comanda" element={<NovaComanda/>}/>
      <Route path="/garcom/comandas/detalhes/:id" element={<DetalheComanda/>} />
      <Route path="/garcom/comandas/detalhes/menu/:id" element={<MenuProdutos/>} />   
      <Route path="/caixa/comandas" element={<Comandas/>}/>
      <Route path="/caixa/comandas/detalhes/:id" element={<DetalheComanda/>} />  
      <Route path="/estoque" element={<Estoque/>}/>  
      <Route path="caixa/historico" element={<HistóricoCaixa/>}/>  
      <Route path="gerente/historico" element={<HistóricoGerente/>}/>
      <Route path="/adm/quadro_de_usuarios" element={<QuadroUsuarios/>}/>
    </Routes>
  );
};

export default Router;