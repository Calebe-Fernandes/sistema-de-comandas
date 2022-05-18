import React from "react";
import { useNavigate } from "react-router";
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HeaderComponent } from "../../components"; 

const Estoque: React.FC = () => {
    return(
        <>
            <HeaderComponent user={"manager"} page="history" />
            

        </>
    )
}
export default Estoque;