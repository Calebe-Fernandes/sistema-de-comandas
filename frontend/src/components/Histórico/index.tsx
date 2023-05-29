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

    const [isActive, setActive] = useState<boolean>(false);
    var [Commands, setCommands] = useState<any[]>([]);
    var [waitingApiResponse, setWaitingApiResponse] = useState<boolean>(true);

    var curr = new Date();
    curr.setDate(curr.getDate());
    var date = curr.toISOString().substr(0, 10);
    var [filterDate, setFilter] = useState(date);

    useEffect(() => {
        api.get("/order/closed")
            .then(response => {
                setCommands(response.data);
            })
            .catch(error => {
                console.log(error)
            })
            .then(() => {
                setWaitingApiResponse(false);
            }
            )
    }, [])

    function toggle(commandId: string | number) {
        if (isActive) {
            setActive(false);
            document.getElementById('command-' + commandId)?.classList.add('hidden');
        } else if (!isActive) {
            setActive(true);
            document.getElementById('command-' + commandId)?.classList.remove('hidden');
        }
    }

    return (
        <>
            <HeaderComponent user={user} page="history" />

            <div className="history-container">
                <label htmlFor="date">Data</label>
                <input type="date" defaultValue={date} max={date} id="date" onChange={(event) => setFilter(event.target.value)}/>

                <div className="historyHeader">
                    <h1>Id</h1>
                    <h1>Mesa</h1>
                    <h1>Entrada</h1>
                    <h1>Saída</h1>
                </div>

                <hr />

                <div className="table-body">
                    {waitingApiResponse && <div className="loaderWrapper"><Loader /></div>}
                    {Commands.map((command) => {
                        return <>
                            <div className={command.closingTime.split("T", 1)[0] === filterDate ? "" : "hidden"}>
                                <div className="command">
                                    <h2>#{command.id}</h2>
                                    <h2>{command.table}</h2>
                                    <h2>{command.openingTime.split("T", 2)[1].split(":", 2).join(":")}</h2>
                                    <h2>{command.closingTime.split("T", 2)[1].split(":", 2).join(":")}</h2>
                                    <FontAwesomeIcon icon={faEye} className="viewButton" onClick={() => toggle(command.id)} />
                                </div>
                                <hr />

                                <div id={`command-${command.id}`} className="modal hidden" >
                                    <div className="modal-background" onClick={() => toggle(command.id)}></div>

                                    <div className="modal-container">
                                        <div className="modal-header">
                                            <div className="modal-title">
                                                <p>ID</p>
                                                <h2>#{command.id}</h2>
                                            </div>

                                            <button className="close-modal" onClick={() => toggle(command.id)}>
                                                <FontAwesomeIcon icon={faX} />
                                            </button>
                                        </div>
                                        <div className="modal-content">
                                            <h3>Informações Gerais</h3>
                                            <div className="detalhesInformaçõesGerais">
                                                <p><b>Mesa:</b> {command.table}</p>
                                                <p><b>Total:</b> R$ {command.orderTotal.toFixed(2)}</p>
                                                <p><b>Entrada:</b> {command.openingTime.split("T", 2)[1].split(":", 2).join(":")}</p>
                                                <p><b>Saída:</b> {command.closingTime.split("T", 2)[1].split(":", 2).join(":")}</p>
                                            </div>
                                            <h3>Pedido</h3>
                                            <div className="detalhesInformaçõesPedido">

                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>Item</th>
                                                            <th>Quant.</th>
                                                            <th className="value-column">Valor u.</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            command.drinkWithdrawalList.map((drinkList: any) => {
                                                                return <>
                                                                    <tr>
                                                                        <td>{drinkList.drink.productName}</td>
                                                                        <td>{drinkList.quantity}</td>
                                                                        <td>R$ {drinkList.drink.price}</td>
                                                                    </tr>
                                                                </>
                                                            })
                                                        }
                                                        {
                                                            command.foodWithdrawalList.map((foodList: any) => {
                                                                return <>
                                                                    <tr>
                                                                        <td>{foodList.food.productName}</td>
                                                                        <td>{foodList.quantity}</td>
                                                                        <td>R$ {foodList.food.price}</td>
                                                                    </tr>
                                                                </>
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    })}
                </div>
            </div>
        </>
    )
}
export default Histórico;