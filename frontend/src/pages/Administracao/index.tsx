import React from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faArrowRightFromBracket, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import UsersBoardIcon from "../../assets/users-board.svg";
import SalesAnalysisIcon from "../../assets/sales-analysis.svg";

import "./styles.scss";

const Administracao: React.FC = () => {
  const navigate = useNavigate();

  const navigateToUsersBoard = () => {
    navigate("/adm/quadro_de_usuarios");
  };

  const navigateToSalesAnalysis = () => {
    navigate("/adm/analise_de_vendas");
  };

  const logout = () =>{
    localStorage.removeItem('user');
    navigate("/login", { replace: true });
  }

  return(
    <>
      <div className="adm-header">
        <div className="adm-header-title">
          <FontAwesomeIcon icon={faUser} className="adm-icon" />
          <p>Administrador</p>
        </div>
        <button className="logout-button" onClick={logout}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} className="logout-icon" />
          <p>Sair</p>
        </button>
      </div>

      <div className="adm-container">
        <div className="adm-card">
          <div className="adm-card-content">
            <div className="adm-card-icon">
              <img src={UsersBoardIcon} alt="" />
            </div>
            <div className="adm-card-texts">
              <p className="adm-card-title">Quadro de usuários</p>
              <p className="adm-card-text">20 usuários ativos</p>
            </div>
          </div>

          <button onClick={() => navigateToUsersBoard()}>
              <p>Gerenciar usuários</p>
              <FontAwesomeIcon icon={faArrowRight} className="arrow-icon"/>
            </button>
        </div>

        <div className="adm-card">
          <div className="adm-card-content">
            <div className="adm-card-icon">
              <img src={SalesAnalysisIcon} alt="" />
            </div>
            <div className="adm-card-texts">
              <p className="adm-card-title">Análise de vendas</p>
              <p className="adm-card-text">Gerenciamento de vendas por período.</p>
            </div>
          </div>

          <button onClick={() => navigateToSalesAnalysis()}>
              <p>Gerenciar vendas</p>
              <FontAwesomeIcon icon={faArrowRight} className="arrow-icon"/>
            </button>
        </div>
      </div>
    </>
  )
}

export default Administracao;