import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { api } from "../../../../services/api";
import { toast } from 'react-toastify';


import "./styles.scss";

interface User {
  [username: string]: string;
  role: string,
  email: string,
  password: string,
  status: string,
  created: string,
  lastEdited: string,
}

interface Props {
  user: User,
  adminToken:string
} 

const ModalUsuario: React.FC<Props> = ({user,adminToken}) => {
  useEffect(() => {
    setUserName(user.username);
    setUserRole(user.role);
    setUserEmail(user.email);
    setUserPassword(user.password);
    setUserStatus(user.isActive);
  },[]);

  const [fieldsChanged, setFieldsChanged] = useState<string[]>([]);
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userStatus, setUserStatus] = useState<string>("");

  var userForm = {
    "username": userName,
    "role": userRole,
    "email": userEmail,
    "password": userPassword,
    "isActive": userStatus,
    "endereco":null,
    "id":user.id,
    "token":user.token
  }

  useEffect((()=>{
    console.log(adminToken);
  }),[])


 async function updateUser(token:string) {
  console.log(userForm)
      await api.put('/user',userForm,{  headers: {
        'Authorization': `Bearer ${token}`
      }})
      .then(response => {
        toast.success('Usuário atualizado com sucesso', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }); 
      }).catch(error => {
        toast.error('Ocorreu um erro durante o processo', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        }); 
        console.log(error) 
    });
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
      case "isActive":
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
      <div className="user-info">
        <div className="form-wrapper">
          <div className="form-field">
            <label>Nome *</label>
            <input
              type="text"
              defaultValue={user.username}
              onChange={(e) => checkChanges(e.target.value, "name")}
              disabled
            />
          </div>

          <div className="form-field">
            <label>Função *</label>
            <select
              defaultValue={user.role}
              onChange={(e) => checkChanges(e.target.value, "role")}
            >
              <option value="waiter">Garçom</option>
              <option value="cashier">Caixa</option>
              <option value="manager">Gerente</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <div className="form-field">
            <label>E-mail *</label>
            <input
              type="email"
              defaultValue={user.email}
              onChange={(e) => checkChanges(e.target.value, "email")}
            />
          </div>

          <div className="form-field">
            <label>Senha *</label>

            <div className="password-input">
              <input
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
              defaultValue={user.isActive}
              onChange={(e) => checkChanges(e.target.value, "isActive")}
            >
              <option value="true">Ativo</option>
              <option value="false">Inativo</option>
            </select>
          </div>
        </div>

        <hr />

        <div className="historic-section">
          <h4>Histórico</h4>
          <p>Cadastrado em {user.createdAt.slice(0,10)}.</p>
          <p>Última atualização em {user.updatedAt.slice(0,10)}.</p>
        </div>
      </div>
      
      <button
        disabled={fieldsChanged.length==0}
        className="main-button"
        onClick={()=>{updateUser(adminToken)}}
      >
        Atualizar usuário
      </button>
    </div>
  )
}

export default ModalUsuario;