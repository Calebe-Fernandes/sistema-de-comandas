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
  var [checkedDrinks, setCheckedDrinks] = useState<string[]>([]);
  var [checkedFood, setCheckedFood] = useState<string[]>([]);



  var user : string;
  if (window.location.href.indexOf("garcom") > -1) {
    user = "waiter";
  } else if (window.location.href.indexOf("caixa") > -1) {
    user = "cashier";
  } else {
    user = "manager";
  }

  useEffect(() => {
      getOrderItens();
    },[]);

  const getOrderItens = () => {
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
  }

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

  const handleCheckDrinks = (e:any) =>{
    var input =  document.getElementById(`quantity-for-${e.target.value}`)
    var updatedList = [...checkedDrinks]
    if(e.target.checked){
      updatedList = [...checkedDrinks, e.target.value];
        input != null && input.removeAttribute('disabled') 
    }else{
    updatedList.splice(checkedDrinks.indexOf(e.target.value), 1);
      input != null && input.setAttribute("disabled", "disabled");
      (input as HTMLInputElement).value = '';
    }
    setCheckedDrinks(updatedList);
  }

  function handleCheckFood(e:any){
    var input =  document.getElementById(`quantity-for-${e.target.value}`)
    var updatedList = [...checkedFood]
    if(e.target.checked){
      updatedList = [...checkedFood, e.target.value];
      input != null && input.removeAttribute('disabled') 
    }else{
      updatedList.splice(checkedFood.indexOf(e.target.value), 1);
      input != null && input.setAttribute("disabled", "disabled");
      (input as HTMLInputElement).value = '';
    }
    setCheckedFood(updatedList);
  }
  
  const removeItemsFromOrder = () => {
    if(checkedDrinks.length > 0 || checkedFood.length > 0){
      checkedDrinks.forEach(drinkID => {
        api.put(`/order/${params.id}/drink-return/${drinkID}`)
            .then( response => {
              toast.success('Item removido com sucesso', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            })
            .catch( error => {
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
            });
      });
      checkedFood.forEach(foodID => {
        api.put(`/order/${params.id}/food-return/${foodID}`)
            .then( response => {
              toast.success('Item removido com sucesso', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            })
            .catch( error => {
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
            });
      });

      //Component is not updating, palliative solution to force re-render of the iterms list
      setTimeout(() => {
        window.location.reload();
      }, 2500);

    }else{
      toast.warning('Selecione ao menos um item para excluir', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
   
    return (
      <>
        { command !== undefined && 
          <div className="command-details-page">
            <CommandHeaderComponent title={`Mesa  ${command.table}`} />
            <div className="command-details-container">
              <div className="delete-item-option-container">
                <p onClick={removeItemsFromOrder}>Excluir Item</p>
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
                          <tr key={drink.id}>
                            <td><input type="checkbox" className="selectItemCheckbox" value={drink.id} onChange={handleCheckDrinks}/></td>
                            <td>{drink.drink.productName}</td>
                            <td><input disabled type="text" id={`quantity-for-${drink.id}`} className="quantityInput" value={drink.quantity}/></td>
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
                        <tr key={food.id}>
                          <td><input type="checkbox" className="selectItemCheckbox" value={food.id} onChange={handleCheckFood}/></td>
                          <td>{food.food.productName}</td>
                          <td><input disabled type="text" id={`quantity-for-${food.id}`} className="quantityInput" value={food.quantity}/></td>
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