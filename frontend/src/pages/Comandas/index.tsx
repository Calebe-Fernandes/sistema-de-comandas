import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./styles.scss";
import {
  AddButtonComponent,
  HeaderComponent
} from "../../components";
import { useNavigate } from "react-router-dom";
const Comandas: React.FC = () => {
  const openCommands = [1, 2, 3, 4, 5, 11, 10];

  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <>
      <HeaderComponent
        user="cashier"
        page="commands"
      />
      <body className="command-container">
        <div className="search">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
          <input
            className="search-input"
            placeholder="Procure por uma mesa"
            type="text"
            list=""
          ></input>
        </div>
        <datalist></datalist>
        <p>Selecione uma mesa para ver seus detalhes</p>
        <div className="open-commands">
          {
            openCommands.map(command => (
              <div className="open-command">
                { command }
              </div>
            ))
          }
        </div>
        <AddButtonComponent navigate={navigateToHome} />
      </body>
    </>
  )
}

export default Comandas;