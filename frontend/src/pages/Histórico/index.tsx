import React, { useEffect } from "react";
import { useNavigate} from "react-router";
import { useState } from "react";
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HeaderComponent } from "../../components";
import { api } from "../../services/api";  


const Estoque: React.FC = () => {

    var [Commands, setCommands] = useState<any[]>([]);
    var [waitingApiResponse, setWaitingApiResponse] = useState<boolean>(true);

    
    useEffect(() => {
        api.get("/order/closed")
        .then(response => {
            setCommands(response.data);
        })
        .catch(error => {
            console.log(error)
          })
          .then( () => {
            setWaitingApiResponse(false);
          }
          )
      },[])



    return(
        <>
            <HeaderComponent user={"manager"} page="history" />
            {Commands.map((command)=>{
                return <>
                    <div className="historyContainer">
                    
                    </div>
                </>    
                console.log(command.id)
            })}

        </>
    )
}
export default Estoque;