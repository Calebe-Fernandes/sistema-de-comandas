import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faEye } from "@fortawesome/free-solid-svg-icons";
import "./styles.scss";
import { AddButtonComponent, FlatHeaderComponent, ModalComponent } from "../../components";
import ModalUsuarios from "./components/ModalUsuario";
import ModalNovoUsuario from "./components/ModalNovoUsuario";
import { api } from "../../services/api";

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
  const [searchValue, setSearchValue] = useState("");
  const [userModal, setUserModal] = useState<boolean>(false);
  const [newUserModal, setNewUserModal] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState();
  const [users, setUserList] = useState<User[]>([]);
  const [filterUsers,setFilteredUsers] = useState<User[]>([]) 
  const [adminData, setAdminData] = useState<any>()

  const localData  = localStorage.getItem('user');
  
  const roles = {
    "admin":"Administrador",
    "manager":"Gerente",
    "cashier":"Caixa",
    "waiter":"Garçom"
  }
 

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
  }

  function toggleNewUserModal() {
    if (newUserModal==false) {
      document.body.style.overflow = 'hidden';
      setNewUserModal(true);
    } else {
      document.body.style.overflow ='auto'
      setNewUserModal(false);
    }
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
          <table>
            <thead className="fixed-thead">
              <tr>
                <th>Nome</th>
                <th>Função</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
            {filterUsers?.length && filterUsers.map((user: any, index) => {
                return <>
                  <tr key={index}>
                    <td>{user.username}</td>
                    <td>{user.role==="manager" ? "Gerente" : user.role==="cashier" ? "Caixa":user.role==="admin" ? "Administrador": "Garçom"}</td>
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
        </div>
      </div>

      <AddButtonComponent navigate={()=>toggleNewUserModal()}/>

      {
        userModal && modalInfo &&
        <ModalComponent
          headerTitle="Visualização de usuário"
          closeModal={() => toggleUserModal("")}
          content={<ModalUsuarios user={modalInfo}/>}
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