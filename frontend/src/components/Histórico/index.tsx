import React, { useEffect, useState } from "react";
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HeaderComponent, Loader } from "../../components";
import { api } from "../../services/api"; 
import { faEye, faX } from "@fortawesome/free-solid-svg-icons" 

interface Props {
    user: string;
  }

const Histórico: React.FC<Props> = ({ user }) => {

    const [isActive, setActive] = useState(false);
    var [Commands, setCommands] = useState<any[]>([]);
    var [waitingApiResponse, setWaitingApiResponse] = useState<boolean>(true);

    var curr = new Date();
    curr.setDate(curr.getDate());
    var date = curr.toISOString().substr(0,10);
    var [filterDate, setFilter] = useState(date);

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

    function toggle(commandId: string | number){
        if(isActive){
            setActive(false);
            document.getElementById('command-' + commandId)?.classList.add('hidden');
        }else if(!isActive){
            setActive(true);
            document.getElementById('command-' + commandId)?.classList.remove('hidden');
        }  
    }

    return(
        <>
            <HeaderComponent user={user} page="history" />
            <div className="dateInput">
                <h2>Data</h2>
                <div>
                    <input type="date" defaultValue={date} max={date} id="date" onChange={(event) => setFilter(event.target.value)}/>
                    
                </div> 
            </div>
            
            <div className="historyHeader">
                <h1>Id</h1>
                <h1>Mesa</h1>
                <h1>Entrada</h1>
                <h1>Saída</h1>
            </div>
            <hr />
        
            <div className="historyContainer">
                {waitingApiResponse && <div className="loaderWrapper"><Loader/></div>}
                {Commands.map((command)=>{
                    return <>
                    <div className={command.closingTime.split("T", 1)[0] === filterDate ? "" : "hidden"}>
                        <div className="command">
                            <h2>#{command.id}</h2>
                            <h2>{command.table}</h2>
                            <h2>{command.openingTime.split("T", 2)[1].split(":", 2).join(":")}</h2>
                            <h2>{command.closingTime.split("T", 2)[1].split(":", 2).join(":")}</h2>
                            <FontAwesomeIcon icon={faEye} className="viewButton" onClick={()=> toggle(command.id)} />
                        </div>
                        <hr />

                        <div id={`command-${command.id}`} className="modal hidden" >
                            <div className="modalBackground" onClick={()=> toggle(command.id)}></div>  
                            <div className="detalhesContainer">
                                <div className="detalhesHeader">
                                    <div>
                                        <h3>ID</h3>
                                        <h2>#{command.id}</h2>
                                    </div>
                                    
                                    <button className="closeModal" onClick={()=> toggle(command.id)}>
                                        <FontAwesomeIcon icon={faX} className="closeButton"/>
                                    </button> 
                                </div>
                                <h1>Informações Gerais</h1>
                                <div className="detalhesInformaçõesGerais">
                                    <div>
                                        <div className="atrWrapper"><h3>Mesa</h3><h3>{command.table}</h3></div>
                                        <div className="atrWrapper"><h3>Entrada</h3><h3>{command.openingTime.split("T", 2)[1].split(":", 2).join(":")}</h3></div>
                                    </div>
                                    <div>
                                        <div className="atrWrapper"><h3>Total</h3><h3>R$ {command.orderTotal.toFixed(2)}</h3></div>
                                        <div className="atrWrapper"><h3>Saída</h3><h3>{command.closingTime.split("T", 2)[1].split(":", 2).join(":")}</h3></div> 
                                    </div>    
                                </div>
                                <h1>Pedido</h1>
                                <div className="detalhesInformaçõesPedido">
                                    <div className="infoHeader">
                                        <h3>item</h3>
                                        <h3>Quant.</h3>
                                        <h3>Valor u.</h3>
                                    </div>
                                    <hr />
                                    <div>
                                        {
                                            command.drinkWithdrawalList.map((drinkList : any)=>{
                                            return <>
                                            <div className="item">
                                                    <h3>{drinkList.drink.productName}</h3>
                                                    <h3>{drinkList.quantity}</h3>
                                                    <h3>{drinkList.drink.price}</h3>
                                            </div> 
                                            <hr className="itemLine"/>
                                            </>
                                        })
                                        }
                                        {
                                            command.foodWithdrawalList.map((foodList : any)=>{
                                            return <>
                                            <div className="item">
                                                    <h3>{foodList.food.productName}</h3>
                                                    <h3>{foodList.quantity}</h3>
                                                    <h3>{foodList.food.price}</h3>
                                            </div> 
                                            <hr className="itemLine"/>
                                            </>
                                        })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </>    
                })}
                
            </div>
        </>
    )
}
export default Histórico;