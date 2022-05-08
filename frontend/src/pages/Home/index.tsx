import React from "react";
import { useNavigate } from "react-router";

import InitialImage from "../../assets/initial-image.webp";
import "./styles.scss";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const navigateToWaiterCommands = () => {
    navigate("/garcom/comandas");
  };

  const navigateToCashierCommands = () => {
    navigate("/caixa/comandas");
  };

  return(
    <>
      <div className="home-container">
        <div className="image-container">
          <img src={InitialImage} alt=""/>
          <div className="centered">
            <div className="title-container">
              <h3>Selecione seu usuário</h3>
              <hr/>
            </div>
            <div className="button-container">
              <button onClick={navigateToWaiterCommands}>Garçom</button>
              <button onClick={navigateToCashierCommands}>Caixa</button>
              <button>Gerente</button>
            </div>
          </div>
        </div>
        <div className="white-container">
          <div className="centered">
            <div className="title-container">
              <h3>Selecione seu usuário</h3>
              <hr/>
            </div>
            <div className="button-container">
              <button onClick={navigateToWaiterCommands}>Garçom</button>
              <button onClick={navigateToCashierCommands}>Caixa</button>
              <button>Gerente</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;