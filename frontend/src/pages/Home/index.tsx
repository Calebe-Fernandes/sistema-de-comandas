import React from "react";
import { useNavigate } from "react-router";

import InitialImage from "../../assets/initial-image.webp";
import "./styles.scss";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const navigateToCommands = () => {
    navigate("/comandas");
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
              <button onClick={navigateToCommands}>Garçom</button>
              <button>Caixa</button>
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
              <button onClick={navigateToCommands}>Garçom</button>
              <button>Caixa</button>
              <button>Gerente</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;