import React from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons'
import './styles.scss';

const Comandas: React.FC = () => {
  // const openCommands = [1, 2, 3, 4, 5, 11, 12];

  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  return(
    <>
      <header>
        <button className="go-back-button" onClick={navigateToHome}>
          <FontAwesomeIcon icon={faArrowLeft} className="go-back-button-icon"/>
        </button>

        <div className="links-container">
          <a href=""className="active">Comandas</a>
          <a href="">Histórico</a>
        </div>
      </header>
      <body className="command-container">
        <div className="search">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon"/>
          <input 
            className="search-input"
            placeholder="Procure por uma mesa"
            type="text"
            list=""
          ></input>
        </div>
        <datalist></datalist>
        <p>Selecione uma mesa para ver seus detalhes</p>
       
        <div className="open-commands">
          <div className="open-command">
            01
          </div>
          <div className="open-command">
            01
          </div>
          <div className="open-command">
            01
          </div>
          <div className="open-command">
            01
          </div>
          <div className="open-command">
            01
          </div>
          <div className="open-command">
            01
          </div>
          <div className="open-command">
            01
          </div>
        </div>
        <button className="add-button">
          <FontAwesomeIcon icon={faPlus} className="add-button-icon"/>
        </button>
      </body>
    </>
  )
}

export default Comandas;