import React from "react";

import "./styles.scss";

const ModalNovoUsuario: React.FC = () => {
  return (
    <div className="modal-novo-usuario">
      <div className="form-wrapper">
        <div className="form-field">
          <label>Nome *</label>
          <input type="text"/>
        </div>

        <div className="form-field">
          <label>Função *</label>
          <select>
            <option value="waiter">Garçom</option>
            <option value="cashier">Caixa</option>
            <option value="manager">Gerente</option>
          </select>
        </div>

        <div className="form-field">
          <label>E-mail *</label>
          <input type="email"/>
        </div>

        <div className="form-field">
          <label>Senha *</label>
          <input type="password"/>
        </div>

        <div className="form-field">
          <label>Status *</label>
          <select>
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
          </select>
        </div>
      </div>

      <button>Atualizar usuário</button>
    </div>
  )
}

export default ModalNovoUsuario;