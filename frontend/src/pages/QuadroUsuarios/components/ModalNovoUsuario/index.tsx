import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import "./styles.scss";

const ModalNovoUsuario: React.FC = () => {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userStatus, setUserStatus] = useState<string>("");

  var userForm = {
    "name": userName,
    "role": userRole,
    "email": userEmail,
    "password": userPassword,
    "status": userStatus,
  }

  function updateUser() {
    console.log(userForm);
  }

  return (
    <div className="modal-novo-usuario">
      <div className="form-wrapper">
        <div className="form-field">
          <label>Nome *</label>
          <input
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label>Função *</label>
          <select
            onChange={(e) => setUserRole(e.target.value)}
            className="round"
            defaultValue="disabled"
          >
            <option disabled value="disabled">Selecione uma opção</option>
            <option value="waiter">Garçom</option>
            <option value="cashier">Caixa</option>
            <option value="manager">Gerente</option>
          </select>
        </div>

        <div className="form-field">
          <label>E-mail *</label>
          <input
            type="email"
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label>Senha *</label>

          <div className="password-input">
            <input
              type={passwordVisibility ? "text" : "password"}
              onChange={(e) => setUserPassword(e.target.value)}
            />

            <button onClick={() => setPasswordVisibility(!passwordVisibility)}>
              {
                passwordVisibility  ? 
                <FontAwesomeIcon icon={faEyeSlash} />
                : <FontAwesomeIcon icon={faEye} />
              }
            </button>
          </div>
        </div>

        <div className="form-field">
          <label>Status *</label>
          <select
            onChange={(e) => setUserStatus(e.target.value)}
            className="round"
            defaultValue="disabled"
          >
            <option disabled value="disabled">Selecione uma opção</option>
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
          </select>
        </div>
      </div>

      <button
        className="main-button"
        onClick={updateUser}
      >
        Criar usuário
      </button>
    </div>
  )
}

export default ModalNovoUsuario;