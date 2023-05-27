import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faEye } from "@fortawesome/free-solid-svg-icons";
import "./styles.scss";
import { AddButtonComponent, FlatHeaderComponent, ModalComponent } from "../../components";
import ModalUsuarios from "./components/ModalUsuario";
import Users from "./users-mock";
import ModalNovoUsuario from "./components/ModalNovoUsuario";

const QuadroUsuarios: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [userModal, setUserModal] = useState<boolean>(false);
  const [newUserModal, setNewUserModal] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState();

  var filterUsersByName = Users.filter(user => user.name.toLowerCase().indexOf(searchValue) > -1);

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
              {filterUsersByName.map((user: any) => {
                return <>
                  <tr>
                    <td>{user.name}</td>
                    <td>{user.role==="manager" ? "Gerente" : user.role==="cashier" ? "Caixa": "Garçom"}</td>
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