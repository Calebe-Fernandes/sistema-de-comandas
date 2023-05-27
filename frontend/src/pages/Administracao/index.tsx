import React from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faArrowRightFromBracket, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import "./styles.scss";

const Administracao: React.FC = () => {
  const navigate = useNavigate();

  const navigateToUsersBoard = () => {
    navigate("/adm/quadro_de_usuarios");
  };

  return(
    <>
      <div className="adm-header">
        <div className="adm-header-title">
          <FontAwesomeIcon icon={faUser} className="adm-icon" />
          <p>Administrador</p>
        </div>
        <button className="logout-button">
          <FontAwesomeIcon icon={faArrowRightFromBracket} className="logout-icon" />
          <p>Sair</p>
        </button>
      </div>

      <div className="adm-container">
        <div className="adm-card">
          <p className="adm-card-title">Quadro de usuários</p>
          <p className="adm-card-text">20 usuários ativos</p>
          <button onClick={() => navigateToUsersBoard()}>
            <p>Gerenciar usuários</p>
            <FontAwesomeIcon icon={faArrowRight} className="arrow-icon"/>
          </button>
        </div>
      </div>
    </>
  )
}

export default Administracao;