import React from "react";
import { useNavigate } from "react-router";
import { useState } from "react";
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons"
import { faX } from "@fortawesome/free-solid-svg-icons"
import { AddButtonComponent, HeaderComponent } from "../../components"; 

const Estoque: React.FC = () => {

    const [isActive, setActive] = useState(false);
    const toggle = () => {
      setActive(!isActive); 
     };

    return(
        <>
            <HeaderComponent user={"manager"} page="stock" />
            <div className="stock-container">
                <div className="filterContainer">
                    <li className="filter">Porções</li>
                    <li className="filter">Bebidas</li>
                    <li className="filter">Lanches</li>
                </div>
                <h1>Item</h1>
                

                {/* items que serão puxados do back */}

                    {/* exemplo de modal*/}

                    <div className={isActive ? "modal" : "modalHide"}>
                        <div className="detalhesContainer">
                            <div className="detalhesHeader">

                                <div>
                                    <h3>Detalhes do item</h3>
                                    <h4>item Exemplo</h4>   
                                </div>

                                <button className="closeModal" onClick={toggle}>
                                    <FontAwesomeIcon icon={faX} className="closeButton"/>
                                </button> 

                            </div>
                        </div>   
                    </div>

                    {/* fim do exemplo de modal*/}

                    {/* exemplo de items */}

                    <div className="item">
                        <h2>item exemplo</h2>
                        <FontAwesomeIcon icon={faEye} className="viewButton" onClick={toggle}/>
                    </div>
                    <hr />
                    <div className="item">
                        <h2>outro item exemplo</h2>
                        <FontAwesomeIcon icon={faEye} className="viewButton"/>
                    </div>
                    <hr />

                    {/* fim do exemplo de items */}

                {/* fim dos items que serão puxados do back */}

            </div>
        </>
    )
}
export default Estoque;