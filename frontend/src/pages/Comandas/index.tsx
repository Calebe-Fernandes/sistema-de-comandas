import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { AddButtonComponent, HeaderComponent } from "../../components";
import "./styles.scss";

const Comandas: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");

  const openCommands = [1, 2, 3, 4, 5, 11, 10];

  const filterCommands = (value: any) => {
    return value.toString().indexOf(searchValue) !== -1;
  };

  let user;
  if (window.location.href.indexOf("garcom") > -1) {
    user = "waiter";
  } else if (window.location.href.indexOf("caixa") > -1) {
    user = "cashier";
  } else {
    user = "waiter";
  }

  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <>
      <HeaderComponent user={user} page="commands" />

      <div className="command-container">
        <div className="search">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
          <input
            className="search-input"
            placeholder="Procure por uma mesa"
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
        </div>

        <p>Selecione uma mesa para ver seus detalhes</p>
        <div className="open-commands">
          {openCommands.filter(filterCommands).map((command) => {
            return <>
              <div className="open-command">
                {command}
              </div>
            </>
          })}
        </div>

        {user === "waiter" ?
          <AddButtonComponent navigate={navigateToHome} />
          : null}
      </div>
    </>
  )
}

export default Comandas;