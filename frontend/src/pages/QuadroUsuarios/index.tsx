import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faEye } from "@fortawesome/free-solid-svg-icons";
import "./styles.scss";
import { AddButtonComponent, FlatHeaderComponent, ModalComponent } from "../../components";
import ModalUsuarios from "./components/ModalUsuario";
import ModalNovoUsuario from "./components/ModalNovoUsuario";
import { api } from "../../services/api";
import {Loader } from "../../components";



interface User {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string,
  isActive: boolean,
  createdAt: string,
  updatedAt: string,
  endereco:string,
  token:string
}


const QuadroUsuarios: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [userModal, setUserModal] = useState<boolean>(false);
  const [newUserModal, setNewUserModal] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState();
  const [users, setUserList] = useState<User[]>([]);
  const [filterUsers,setFilteredUsers] = useState<User[]>([]); 
  const [adminData, setAdminData] = useState<any>();
  const localData  = localStorage.getItem('user');
  const [waitingApiResponse, setWaitingApiResponse]= useState<boolean>(true);

  
  useEffect(() => {
    if(localData){
      setAdminData(JSON.parse(localData))
      getAllUsers(localData);
    }
    
  },[]);

  useEffect(()=>{
    console.log(users)
  },[users])

  useEffect(()=>{
    setFilteredUsers(users.filter(user => user.username.toLowerCase().indexOf(searchValue.toLowerCase()) > -1));
  },[searchValue,users]);


  async function getAllUsers(localData:any){
    await api.get<any>('/users',{  headers: {
      'Authorization': `Bearer ${JSON.parse(localData).token}`
    }})
    .then(response =>{
      setWaitingApiResponse(false);
      setUserList(response.data);
    })
  }


  function toggleUserModal(user: any) {
    if (userModal==false) {
      setModalInfo(user);
      setUserModal(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow ='auto'
      setUserModal(false);
    }
    getAllUsers(localData);
  }

  function toggleNewUserModal() {
    if (newUserModal==false) {
      document.body.style.overflow = 'hidden';
      setNewUserModal(true);
    } else {
      document.body.style.overflow ='auto'
      setNewUserModal(false);
    }
    getAllUsers(localData);
  }

  return (
    <>
      <FlatHeaderComponent title="Quadro de usuários"/>

      <div className="quadro-usuarios-container">
        <div className="search">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
          <input
            className="search-input"
            placeholder="Busque por um usuário"
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
        </div>

        <div className="table-container">
        {waitingApiResponse && <Loader/>}
        {!waitingApiResponse && 
         <table>
            <thead className="fixed-thead">
              <tr>
                <th>Nome</th>
                <th>Função</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {filterUsers?.length && filterUsers.map((user: any, index) => {
                return <>
                  <tr key={index}>
                    <td>{user.username}</td>
                    <td>{user.role==="manager" ? "Gerente" : user.role==="cashier" ? "Caixa":user.role==="admin" ? "Administrador": "Garçom"}</td>
                    <td style={user.isActive ? {color:'green'} : {color:'red'}}>{user.isActive ? "Ativo" : "Inativo"}</td>
                    <td className="view-td">
                      <button onClick={() => toggleUserModal(user)}>
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                    </td>
                  </tr>
                </>
              })}
            </tbody>
          </table>
        }
        </div>
      </div>

      <AddButtonComponent navigate={()=>toggleNewUserModal()}/>

      {
        userModal && modalInfo && localData &&
        <ModalComponent
          headerTitle="Visualização de usuário"
          closeModal={() => toggleUserModal("")}
          content={<ModalUsuarios user={modalInfo} adminToken={JSON.parse(localData).token}/>}
        />
      }

      {
        newUserModal &&
        <ModalComponent
          headerTitle="Novo usuário"
          closeModal={() => toggleNewUserModal()}
          content={<ModalNovoUsuario/>}
        />
      }
    </>
  )
}

export default QuadroUsuarios;