import React from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import "./styles.scss";

interface Props {
  user: string;
  page?: string;
}

const HeaderComponent: React.FC<Props> = ({ user, page }) => {

  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
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
    <>
      <header className="header">
        <button className="go-back-button" onClick={navigateToHome}>
          <FontAwesomeIcon icon={faArrowLeft} className="go-back-button-icon" />
        </button>

        {user !== "waiter" ?
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
          : null}
      </header>
    </>
  )
}

export default HeaderComponent;