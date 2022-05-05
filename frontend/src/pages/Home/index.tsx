import React from "react";
import InitialImage from '../../assets/initial-image.webp';
import './styles.scss';

const Home: React.FC = () => {
  return(
    <>
      <body className="home-container">
        <div className="image-container">
          <img src={ InitialImage } alt=""/>
          <div className="centered">
            <div className="title-container">
              <h3>Selecione seu usuário</h3>
              <hr/>
            </div>
            <div className="button-container">
              <button>Garçom</button>
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
              <button>Garçom</button>
              <button>Caixa</button>
              <button>Gerente</button>
            </div>
          </div>
        </div>
      </body>
    </>
  )
}

export default Home;