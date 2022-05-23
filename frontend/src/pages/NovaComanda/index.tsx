import React, { useEffect, useState } from "react";
import { CommandHeaderComponent, Loader } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck, faSquare } from "@fortawesome/free-regular-svg-icons";
import { api } from "../../services/api";
import EmptyContent from "../../components/EmptyContent";

import $ from 'jquery';
import "./styles.scss";

interface drink {
  "id": number,
  "price": number,
  "productName": string,
  "description": string,
  "stockAmmount": number,
  "alcoholic": boolean
}

interface food {
  "id": number,
  "price": number,
  "productName": string,
  "description": string,
  "isAvaliable": boolean
}

const NovaComanda: React.FC = () => {

  var [checkedFood, setCheckedFood] = useState<string[]>([]);
  var [checkedDrinks, setCheckedDrinks] = useState<string[]>([]);
  var [drinks, setDrinks] = useState<drink[]>([])
  var [foods, setFoods] = useState<food[]>([])
  var [showDrinks, setShowDrinks] = useState<boolean>(true)
  var [waitingApiResponse, setWaitingApiResponse] = useState<boolean>(true);

  var request:any = {
    "table": 4,
    "drinkWithdrawalList": null,
    "foodWithdrawalList": null,
  }

  useEffect(() => {
    api.get("/drinks")
        .then(response => {
          setDrinks(response.data);
        })
        .catch(error => {
          console.log(error)
        })
        .then( () => {
          setWaitingApiResponse(false);
        }
        )
  },[])

  function getFoodList(){
    
    var activeButton = $('.menu-option')[1];
    $('.menu-option').removeClass('active');
    $(activeButton).addClass('active');

    setWaitingApiResponse(true);
    setShowDrinks(false);

    api.get("/food")
        .then(response => {
          setFoods(response.data);
        })
        .catch(error => {
          console.log(error)
        })
        .then( () => {
          setWaitingApiResponse(false);
        }
        )
  }

  function getDrinkList(){

    var activeButton = $('.menu-option')[0];
    $('.menu-option').removeClass('active');
    $(activeButton).addClass('active');

    setWaitingApiResponse(true);
    setShowDrinks(true);

    api.get("/drinks")
        .then(response => {
          setDrinks(response.data);
        })
        .catch(error => {
          console.log(error)
        })
        .then( () => {
          setWaitingApiResponse(false);
        }
        )
  }

  function handleCheckDrinks(e:any){
    var updatedList = [...checkedDrinks]
    if(e.target.checked){
      updatedList = [...checkedDrinks, e.target.value];
    }else{
    updatedList.splice(checkedDrinks.indexOf(e.target.value), 1);
    }
    setCheckedDrinks(updatedList);
  }

  function handleCheckFood(e:any){
    var updatedList = [...checkedFood]
    if(e.target.checked){
      updatedList = [...checkedFood, e.target.value];
      
    }else{
      updatedList.splice(checkedFood.indexOf(e.target.value), 1);
    console.log(e.target.value)
    }
    setCheckedFood(updatedList);
    console.log(checkedFood)
  }

  function postOrder (){
    request.table = $('#table').val();
    var order;

    api.post("/order",request)
        .then(response => {
          order = response.data;
          console.log(response)
          //api.post(`/order/request-drink/${order.id}`)
        })
        .catch(error => { console.log(error)})   
  }

  return (
    <>
      <CommandHeaderComponent title="Nova Comanda" />

      <div className="new-command-container">

        <label htmlFor="table">Mesa</label>
        <input type="text" id="table" name="table"/>

        <div className="menu-options">
          <button onClick={getDrinkList} className="menu-option active"><p>Bebidas</p></button>
          <button onClick={getFoodList} className="menu-option"><p>Porções</p></button>
        </div>

        {waitingApiResponse && <Loader/>}

        {!waitingApiResponse && drinks.length === 0 && 
          <>
            <p>Não há itens nessa categoria</p>
            <EmptyContent/> 
          </>
        }

        {!waitingApiResponse && drinks.length !== 0 && showDrinks &&
          <div>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Item</th>
                  <th>Quant.</th>
                </tr>
              </thead>
              <tbody>
                {drinks.map((drink) => {
                  return <>
                    <tr>
                      <td><input type="checkbox" className="selectItemCheckbox"/></td>
                      <td>{ drink.productName }</td>
                      <td><input type="text" /></td>
                    </tr>
                  </>
                })}
              </tbody>
             </table>
          </div>
        }

        {!waitingApiResponse && foods.length === 0 && !showDrinks &&
          <>
            <p>Não há itens nessa categoria</p>
            <EmptyContent/> 
          </>
        }

        {!waitingApiResponse && foods.length !== 0 && !showDrinks &&
          <div>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Item</th>
                  <th>Quant.</th>
                </tr>
              </thead>
              <tbody>
                {foods.map((food) => {
                  return <>
                    <tr>
                      <td><input type="checkbox" className="selectItemCheckbox"/></td>
                      <td>{ food.productName }</td>
                      <td><input type="text" /></td>
                    </tr>
                  </>
                })}
              </tbody>
             </table>
          </div>
        }


        <button className="btn" onClick={postOrder}>Realizar pedido</button>
      </div>
    </>
  )
}

export default NovaComanda;