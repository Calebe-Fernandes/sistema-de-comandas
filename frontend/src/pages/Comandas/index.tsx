import React, { Component, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { AddButtonComponent, HeaderComponent } from "../../components";
import { api } from "../../services/api";
import noOpenCommandsImage from "../../assets/no-open-commands.svg";
import "./styles.scss";


function Comandas(){
  var [searchValue, setSearchValue] = useState("");
  var [openCommands, setOpenCommands] = useState<number[]>([]);
  var [waitingApiResponse, setWaitingApiResponse] = useState<boolean>(true);
  var [areThereOpenCommands, setAreThereOpenCommands] = useState<boolean>(false);
  var openCommandsResponse;

  useEffect(() => {
    api.get("/order/open")
        .then((response) => {
          openCommandsResponse = response.data;
          openCommandsResponse.forEach((command:any) => {
            setOpenCommands( arr => { return [...arr,command.table]})
          });
        })
        .catch(error => {
          console.log(error)
        })
        .then(() => {
          setWaitingApiResponse(false);
          if(openCommandsResponse.length > 0){
            setAreThereOpenCommands(true);
          }
        })
  },[])
  
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

        <p>
          {areThereOpenCommands && "Selecione uma mesa para ver seus detalhes"}
          {!areThereOpenCommands && "Não há comandas abertas no momento"}
        </p>

        {waitingApiResponse && <h1>Carregando comandas</h1>}
        {!waitingApiResponse && !areThereOpenCommands &&

          <div className="no-open-commands">
              <img src={noOpenCommandsImage} alt="Prancheta vazia" />
          </div>
        }
        {!waitingApiResponse && areThereOpenCommands &&
          <div className="open-commands">
            {openCommands.filter(filterCommands).map((tableNumber) => {
              return <>
                <div className="open-command">
                  {tableNumber}
                </div>
              </>
            })}
          </div>
        }

        {user === "waiter" ?
          <AddButtonComponent navigate={navigateToHome} />
          : null}
      </div>
    </>
  )
}

export default Comandas;