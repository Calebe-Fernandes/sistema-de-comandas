import React, { useEffect, useState } from "react";
import { useParams } from "react-router"
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { AddButtonComponent, CommandHeaderComponent } from "../../components";
import { api } from "../../services/api";
import "./styles.scss";

const DetalheComanda: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();

  var requestCommand;
  var [command, setCommand] = useState<any>();
  var [drinks, setDrinks] = useState<any[]>([]);
  var [foods, setFoods] = useState<any[]>([]);
  var [refresh, setRefresh] = useState<boolean>(false);
  
  var user: string;
  if (window.location.href.indexOf("garcom") > -1) {
    user = "waiter";
  } else if (window.location.href.indexOf("caixa") > -1) {
    user = "cashier";
  } else {
    user = "manager";
  }

  useEffect(() => {
    getOrderItens();
  }, []);

  const getOrderItens = () => {
    api.get(`/order/${params.id}`)
      .then(response => {
        requestCommand = response.data;
        setCommand(requestCommand);

        requestCommand.drinkWithdrawalList.forEach((drink: any) => {
          setDrinks(arr => { return [...arr, drink] });
        });

        requestCommand.foodWithdrawalList.forEach((food: any) => {
          setFoods(arr => { return [...arr, food] });
        });

      })
      .catch(error => { console.log(error) });
    setRefresh(false);
  }

  const navigateToProductMenu = () => {
    navigate(`/garcom/comandas/detalhes/menu/${params.id}`);
  };

  const closeCommand = () => {
    api.put(`/order/close/${params.id}`).then(response => {
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

  const removeDrinkFromOrder = (drinkID: string) => {
    api.put(`/order/${params.id}/drink-return/${drinkID}`).then(response => {
      toast.success('Item removido com sucesso', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }).catch(error => {
      console.log(error);
      toast.error('Um erro inesperado ocorreu', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }).then(()=>{
      api.get(`/order/${params.id}`).then(response =>{
        setDrinks(response.data.drinkWithdrawalList);
        setCommand(response.data);
      });
    });
  };

  const removeFoodFromOrder = (foodID: string) => {
    api.put(`/order/${params.id}/food-return/${foodID}`).then(response => {
      toast.success('Item removido com sucesso', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }).catch(error => {
      console.log(error);
      toast.error('Um erro inesperado ocorreu', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }).then(()=>{
      api.get(`/order/${params.id}`).then(response =>{
        setFoods(response.data.foodWithdrawalList);
        setCommand(response.data);
      });
    });
   
  };

return (
  <>
    {command !== undefined &&
      <div className="command-details-page">
        <CommandHeaderComponent title={`Mesa  ${command.table}`} />
        <div className="command-details-container">

          <div id="drinkList" className="relative-position">
            <div className="table-container">
              <table>
                <thead className="fixed-thead">
                  <tr>
                    <th>Item</th>
                    <th>Quant.</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {drinks.map(drink => {
                    return (
                      <>
                        <tr key={drink.id}>
                          <td>{drink.drink.productName}</td>
                          <td>{drink.quantity}</td>
                          <td> <FontAwesomeIcon icon={faTrash} className="trash-icon" onClick={()=>{removeDrinkFromOrder(drink.id)}} /></td>
                        </tr>
                      </>
                    )
                  })}
                  {foods.map(food => {
                    return (
                      <>
                        <tr key={food.id}>
                          <td>{food.food.productName}</td>
                          <td>{food.quantity}</td>
                          <td><FontAwesomeIcon icon={faTrash} className="trash-icon" onClick={()=>{removeFoodFromOrder(food.id)}} /></td>
                        </tr>
                      </>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {user === 'waiter' &&
            <div className="footer waiter-footer">
              <div className="order-total">
                <p className="total-text">Total</p>
                <p className="value">R$ {command.orderTotal}</p>
              </div>

              <AddButtonComponent navigate={navigateToProductMenu} />
            </div>
          }
        </div>

        {user === 'cashier' &&
          <div className="footer cashier-footer">
            <div className="order-total">
              <p className="total-text">Total</p>
              <p className="value">R$ {command.orderTotal}</p>
            </div>

            <AddButtonComponent navigate={navigateToProductMenu} />

            <button className="btn closeCommandButton" onClick={closeCommand}>Fechar comanda</button>
          </div>
        }
      </div>
    }
  </>
)
}

export default DetalheComanda