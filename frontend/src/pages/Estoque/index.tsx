import React from "react";
import { useNavigate } from "react-router";
import "./styles.scss";
import { AddButtonComponent, HeaderComponent } from "../../components"; 

const Estoque: React.FC = () => {
    return(
        <>
            <HeaderComponent user={'manager'} page="commands" />


        </>
    )
}
export default Estoque;