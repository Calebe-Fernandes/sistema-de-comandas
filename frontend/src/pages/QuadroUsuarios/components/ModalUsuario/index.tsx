import React, { useEffect, useState } from "react";

import "./styles.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface User {
  [name: string]: string;
  role: string,
  email: string,
  password: string,
  status: string,
  created: string,
  lastEdited: string,
}

interface Props {
  user: User,
} 

const ModalUsuario: React.FC<Props> = ({user}) => {
  useEffect(() => {
    setUserName(user.name);
    setUserRole(user.role);
    setUserEmail(user.email);
    setUserPassword(user.password);
    setUserStatus(user.status);
  },[]);

  const [fieldsChanged, setFieldsChanged] = useState<string[]>([]);
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

  function setUserState(fieldValue:any, fieldName: any) {
    switch (fieldName) {
      case "name":
        setUserName(fieldValue);
        break;
      case "role":
        setUserRole(fieldValue);
        break;
      case "email":
        setUserEmail(fieldValue);
        break;
      case "password":
        setUserPassword(fieldValue);
        break;
      case "status":
        setUserStatus(fieldValue);
        break;
    }
  }

  function checkChanges(fieldValue:any, fieldName: any) {
    if(user[fieldName]!==fieldValue) {
      !fieldsChanged.includes(fieldName) &&
      setFieldsChanged(prevState => [...prevState, fieldName])
    } else {
      setFieldsChanged(prevState => prevState.filter(field => field == fieldName));
    }
    
    setUserState(fieldValue, fieldName);
  }

  return (
    <div className="modal-usuario">
      <div className="form-wrapper">
        <div className="form-field">
          <label>Nome *</label>
          <input
            id="user-name"
            type="text"
            defaultValue={user.name}
            onChange={(e) => checkChanges(e.target.value, "name")}
          />
        </div>

        <div className="form-field">
          <label>Função *</label>
          <select
            id="user-role"
            defaultValue={user.role}
            onChange={(e) => checkChanges(e.target.value, "role")}
          >
            <option value="waiter">Garçom</option>
            <option value="cashier">Caixa</option>
            <option value="manager">Gerente</option>
          </select>
        </div>

        <div className="form-field">
          <label>E-mail *</label>
          <input
            id="user-email"
            type="email"
            defaultValue={user.email}
            onChange={(e) => checkChanges(e.target.value, "email")}
          />
        </div>

        <div className="form-field">
          <label>Senha *</label>

          <div className="password-input">
            <input
              id="user-password"
              type={passwordVisibility ? "text" : "password"}
              defaultValue={user.password}
              onChange={(e) => checkChanges(e.target.value, "password")}
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
            id="user-status"
            defaultValue={user.status}
            onChange={(e) => checkChanges(e.target.value, "status")}
          >
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
          </select>
        </div>
      </div>

      <hr />

      <div className="historic-section">
        <h4>Histórico</h4>
        <p>Cadastrado em {user.created}.</p>
        <p>Última atualização em {user.lastEdited}.</p>
      </div>
      
      <button
        disabled={fieldsChanged.length==0}
        className="main-button"
        onClick={updateUser}
      >
        Atualizar usuário
      </button>
    </div>
  )
}

export default ModalUsuario;