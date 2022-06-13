import React, { useEffect, useState } from "react";
import {useParams} from "react-router"
import { useNavigate } from "react-router-dom";

import { AddButtonComponent, CommandHeaderComponent, Loader } from "../../components";
import { api } from "../../services/api";

import "./styles.scss";




const DetalheComanda:React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();

  const navigateToProductMenu = () =>{
    navigate(`/garcom/comandas/detalhes/menu/${params.id}`);
  };

  var requestCommand;
  var [command,setCommand] = useState<any>();
  var [drinks,setDrinks] = useState<any[]>([]);
  var [foods,setFoods] = useState<any[]>([]);

  var user;
  if (window.location.href.indexOf("garcom") > -1) {
    user = "waiter";
  } else if (window.location.href.indexOf("caixa") > -1) {
    user = "cashier";
  } else {
    user = "manager";
  }
  console.log(user)

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
    },[])
   
    return (
      <>
        { command !== undefined && 
          <div className="command-details-page">
            <CommandHeaderComponent title={`Mesa  ${command.table}`} />
            <div className="command-details-container">
              <div className="delete-tiem-container">
                <p>Excluir Item</p>
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

              <div className="footer">
                <div className="order-total">
                  <p>R${command.orderTotal}</p>
                </div>
                <AddButtonComponent navigate={navigateToProductMenu}/>

                
                { user === 'cashier'  && <button className="btn" onClick={function(){}}>Fechar comanda</button> }
              </div>

            </div>
          </div>  
        }   
      </>
    )
}

export default DetalheComanda