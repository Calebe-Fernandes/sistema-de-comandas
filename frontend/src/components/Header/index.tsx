/* eslint-disable jsx-a11y/anchor-is-valid */
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

  return (
    <>
      <header>
        <button className="go-back-button" onClick={navigateToHome}>
          <FontAwesomeIcon icon={faArrowLeft} className="go-back-button-icon" />
        </button>

        {user !== "waiter" ?
          <div className="links-container" >
            {user === "cashier" ?
              <a className={page === "commands" ? "active" : ""}>Comandas</a>
              : null}
            {user === "manager" ?
              <a className={page === "stock" ? "active" : ""}>Estoque</a> 
              : null}
            {user === "cashier" || user === "manager" ? 
              <a className={page === "history" ? "active" : ""}>Histórico</a> 
              : null}
          </div>
          : null}
      </header>
    </>
  )
}

export default HeaderComponent;