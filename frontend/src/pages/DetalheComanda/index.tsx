import React, { useEffect, useState } from "react";
import {useParams} from "react-router"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import { AddButtonComponent, CommandHeaderComponent, Loader } from "../../components";
import { api } from "../../services/api";

import "./styles.scss";


const DetalheComanda:React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();



  var requestCommand;
  var [command,setCommand] = useState<any>();
  var [drinks,setDrinks] = useState<any[]>([]);
  var [foods,setFoods] = useState<any[]>([]);

  var user : string;
  if (window.location.href.indexOf("garcom") > -1) {
    user = "waiter";
  } else if (window.location.href.indexOf("caixa") > -1) {
    user = "cashier";
  } else {
    user = "manager";
  }

  useEffect(() => {
    api.get(`/order/${params.id}`) 
        .then(response => {
          requestCommand = response.data;
          setCommand(requestCommand);

          requestCommand.drinkWithdrawalList.forEach((drink:any) => {
            setDrinks(arr => {return [...arr,drink]});
          });

          requestCommand.foodWithdrawalList.forEach((food:any) => {
            setFoods(arr => {return [...arr,food]});
          });

        })
        .catch(error => {console.log(error)})
    },[]);

  const navigateToProductMenu = () =>{
    navigate(`/garcom/comandas/detalhes/menu/${params.id}`);
  };

  const closeCommand = ()=>{
    api.put(`/order/close/${params.id}`).then( response => {
            toast.success('Comanda fechada com sucesso!', {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
              navigate("/caixa/comandas");
          }
        ).catch(error => {
          console.error();
          toast.error('Um erro inesperado ocorreu', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
          }
        );
  }
   
    return (
      <>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        { command !== undefined && 
          <div className="command-details-page">
            <CommandHeaderComponent title={`Mesa  ${command.table}`} />
            <div className="command-details-container">
              <div className="delete-tiem-container">
                <p onClick={function(){alert('excluiu')}}>Excluir Item</p>
              </div>

              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Item</th>
                    <th>Quant.</th>
                  </tr>
                </thead>
                <tbody>
                { drinks.map(drink => {
                      return (
                        <>            
                          <tr>
                            <td><input type="checkbox" className="selectItemCheckbox" /></td>
                            <td>{drink.drink.productName}</td>
                            <td><input disabled type="text" className= "quantityInput" value={drink.quantity}/></td>
                          </tr>
                        </>
                      )
                    }
                  ) 
                }
                {
                  foods.map(food => {
                    return (
                      <>            
                        <tr>
                          <td><input type="checkbox" className="selectItemCheckbox" /></td>
                          <td>{food.food.productName}</td>
                          <td><input disabled type="text" className= "quantityInput" value={food.quantity}/></td>
                        </tr>
                      </>
                    )
                  }
                  ) 
                }

                </tbody>
              </table>
              
              <div className="order-total">
                <p>R${command.orderTotal}</p>
              </div>
              <AddButtonComponent navigate={navigateToProductMenu}/>
            </div>
            { user === 'cashier'  &&  <button className="btn closeCommandButton" onClick={closeCommand}>Fechar comanda</button>}           
          </div>  
        }   
      </>
    )
}

export default DetalheComanda