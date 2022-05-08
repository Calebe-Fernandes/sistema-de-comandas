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

  return (
    <>
      <header>
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
              <div className={page === "stock" ? "active" : ""}>Estoque</div>
              : null}
            {user === "cashier" || user === "manager" ?
              <div className={page === "history" ? "active" : ""}>Histórico</div>
              : null}
          </div>
          : null}
      </header>
    </>
  )
}

export default HeaderComponent;