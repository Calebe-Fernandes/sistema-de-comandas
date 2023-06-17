import React from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import "./styles.scss";

interface Props {
  user: string;
  page?: string;
}

const HeaderComponent: React.FC<Props> = ({ user, page }) => {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    navigate("/", { replace: true });
  };

  const navigateToCashierCommands = () => {
    navigate("/caixa/comandas");
  };

  const navigateToStock = () => {
    navigate("/estoque");
  };

  const navigateToCashierHistory = () => {
    navigate("../caixa/historico")
  }

  const navigateToManagerHistory = () => {
    navigate("../gerente/historico")
  }

  return (
    <header className={user=="waiter" ? "header waiter-header" : "header"}>
      {
        user !== "waiter" ?
        <div className="links-container" >
          {user === "cashier" ?
            <div
              className={page === "commands" ? "active" : ""}
              onClick={navigateToCashierCommands}
            > Comandas </div>
            : null}
          {user === "manager" ?
            <div className={page === "stock" ? "active" : ""}
              onClick={navigateToStock}
            > Estoque</div>
            : null}
          {user === "cashier"?
            <div className={page === "history" ? "active" : ""}
            onClick={navigateToCashierHistory}
            > Histórico</div>
            : null}
          {user === "manager"?
            <div className={page === "history" ? "active" : ""}
            onClick={navigateToManagerHistory}
            > Histórico</div>
            : null}
        </div>
        : null
      }

      <button
        className={user=="waiter" ? "logout-button" : "logout-button logout-button-display"}
        onClick={logout}
      >
        <FontAwesomeIcon icon={faArrowRightFromBracket} className="go-back-button-icon" />
        <p>Sair</p>
      </button>
    </header>
  )
}

export default HeaderComponent;