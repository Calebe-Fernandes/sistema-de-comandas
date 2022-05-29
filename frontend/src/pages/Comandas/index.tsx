import React, { Component, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { AddButtonComponent, HeaderComponent, Loader } from "../../components";
import { api } from "../../services/api";
import "./styles.scss";
import EmptyContent from "../../components/EmptyContent";


const Comandas:React.FC = ()=> {
  const navigate = useNavigate();
  var [searchValue, setSearchValue] = useState("");
  var [openCommands, setOpenCommands] = useState<number[]>([]);
  var [waitingApiResponse, setWaitingApiResponse] = useState<boolean>(true);
  var [areThereOpenCommands, setAreThereOpenCommands] = useState<boolean>(false);
  var [commands, setCommands] = useState<any>();
  var openCommandsResponse:any;

  useEffect(() => {
    api.get("/order/open")
        .then((response) => {
          openCommandsResponse = response.data;
          setCommands(response.data)
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


  const navigateToNewCommand = () => {
    navigate("/garcom/comandas/nova_comanda");
  };

  const navigateToCommandDetails = (tableNumber:number) => {
    const id = getCommand(tableNumber)
    navigate(`/garcom/comandas/detalhes/${id}`);
  }
  
  const getCommand = (tableNumber:number) =>{
    var id;

    commands.forEach((command:any) => {
      if(command.table === tableNumber){
        id = command.id;
      }
    });

    return id;
  }


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
          {waitingApiResponse && "Carregando comandas"}
          {areThereOpenCommands && "Selecione uma mesa para ver seus detalhes"}
          {!areThereOpenCommands && !waitingApiResponse && "Não há comandas abertas no momento"}
        </p>

        {waitingApiResponse && <Loader/>}
        {!waitingApiResponse && !areThereOpenCommands && <EmptyContent/>}
        {!waitingApiResponse && areThereOpenCommands &&
          <div className="open-commands">
            {openCommands.filter(filterCommands).map((tableNumber) => {
              return <>
                <div className="open-command" onClick={()=>{navigateToCommandDetails(tableNumber)}}>
                  {tableNumber}
                </div>
              </>
            })}
          </div>
        }

        {user === "waiter" ?
          <AddButtonComponent navigate={navigateToNewCommand} />
          : null}
      </div>
    </>
  )
}

export default Comandas;