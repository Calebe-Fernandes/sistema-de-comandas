import React, { useEffect, useState } from "react";
import { CommandHeaderComponent, Loader } from "../../components";
import { useNavigate } from "react-router";
import { api } from "../../services/api";
import EmptyContent from "../../components/EmptyContent";
import { ToastContainer, toast } from 'react-toastify';

import $ from 'jquery';
import "./styles.scss";
import 'react-toastify/dist/ReactToastify.css';


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
  

  const navigate = useNavigate();

  var [checkedFood, setCheckedFood] = useState<string[]>([]);
  var [checkedDrinks, setCheckedDrinks] = useState<string[]>([]);
  var [drinks, setDrinks] = useState<drink[]>([])
  var [foods, setFoods] = useState<food[]>([])
  var [showDrinks, setShowDrinks] = useState<boolean>(true)
  var [waitingApiResponse, setWaitingApiResponse] = useState<boolean>(true);

  var request:any = {
    "table": 0,
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

  useEffect(() => {
    validateOrder();
 }, [checkedDrinks,checkedFood]);

 useEffect(()=>{
  document.getElementById('drinkList')?.classList.add('hidden') ;
  document.getElementById('foodList')?.classList.add('hidden');
   if(!waitingApiResponse){
    if(!showDrinks){
      foods.length > 0 && document.getElementById('foodList')?.classList.remove('hidden');
    }else if(showDrinks){
      drinks.length > 0 && document.getElementById('drinkList')?.classList.remove('hidden'); 
    }
   }
 },[showDrinks,waitingApiResponse])

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

  function validateOrder(){
    var tableField = (document.getElementById('table') as HTMLInputElement).value
    var sendFormBtn = document.querySelector('.btn');
    var quantityFields = document.querySelectorAll('.quantityInput')
    var fieldsValid = 0;

    if(parseInt(tableField) > 0){
      
      for (let index = 0; index < quantityFields.length; index++) {
        var value = (quantityFields[index] as HTMLInputElement).value
        if(parseInt(value) > 0){
          sendFormBtn !== null && sendFormBtn.removeAttribute('disabled') 
          break;
        }else{
          sendFormBtn !== null && sendFormBtn.setAttribute("disabled", "disabled");
        }
      }

      for (let index = 0; index < quantityFields.length; index++) {
        var value = (quantityFields[index] as HTMLInputElement).value
        if(parseInt(value) > 0){
          fieldsValid++;
        }
      }

      if(checkedDrinks.length+checkedFood.length === fieldsValid && fieldsValid>0 ){
        sendFormBtn !== null && sendFormBtn.removeAttribute('disabled') 
      }else{
        sendFormBtn !== null && sendFormBtn.setAttribute("disabled", "disabled");
      }
  
    }else{
      sendFormBtn !== null && sendFormBtn.setAttribute("disabled", "disabled");
    }

  }

  function handleCheckDrinks(e:any){
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

  function postOrder (){
    request.table = $('#table').val();
    var order;
    api.post("/order",request)
        .then(response => {
          order = response.data;
          postDrinks(order.id)
          postFood(order.id)
          toast.success('Comanda criada com sucesso!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            navigate("/garcom/comandas");
        })
        .catch(error => { 
          console.log(error)
          toast.error(error.response.data.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        })
  }

  function postDrinks(orderId:number){

    var orderedDrinks:any[] = []

    checkedDrinks.forEach((drinkID) =>{
        var requestDrink:any = {
          "drinkId":drinkID,
          "drinkAmount": $(`#quantity-for-${drinkID}`).val()
        }
        orderedDrinks.push(requestDrink)
    })

    api.post(`/order/request-drink/${orderId}`,orderedDrinks)
        .then(response => {
          console.log(response)
       })
        .catch(error => { console.log(error)})  
  }

  function postFood(orderId:number){
    var orderedFood:any[] = []

    checkedFood.forEach((foodID) =>{
        var requestFood:any = {
          "foodId":foodID,
          "quantity":$(`#quantity-for-${foodID}`).val()
        }
        orderedFood.push(requestFood)
    })

    api.post(`/order/request-food/${orderId}`,orderedFood)
        .then(response => {
          console.log(response)
       })
        .catch(error => { console.log(error)})  
  }

  return (
    <>
      <CommandHeaderComponent title="Nova Comanda" />

      <div className="new-command-container">

        <label htmlFor="table">Mesa</label>
        <input type="text" id="table" name="table" onChange={validateOrder}/>

        <div className="menu-options">
          <button onClick={getDrinkList} className="menu-option active"><p>Bebidas</p></button>
          <button onClick={getFoodList} className="menu-option"><p>Porções</p></button>
        </div>

        {waitingApiResponse && <Loader/>}

        {!waitingApiResponse && drinks.length === 0 && showDrinks &&
          <>
            <p>Não há itens nessa categoria</p>
            <EmptyContent/> 
          </>
        }
        
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
            <div id="drinkList" className="hidden">
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
                        <td><input type="checkbox" className="selectItemCheckbox" value={drink.id} onChange={handleCheckDrinks}/></td>
                        <td>{ drink.productName }</td>
                        <td><input disabled type="text" className= "quantityInput" id={`quantity-for-${drink.id}`} onChange={validateOrder}/></td>
                      </tr>
                    </>
                  })}
                </tbody>
              </table>
            </div>

            <div id="foodList" className="hidden">
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
                      <td><input type="checkbox" className="selectItemCheckbox" value={food.id} onChange={handleCheckFood}/></td>
                      <td>{ food.productName }</td>
                      <td><input disabled type="text" className= "quantityInput" id={`quantity-for-${food.id}`} onChange={validateOrder}/></td>
                    </tr>
                  </>
                })}
              </tbody>
             </table>
          </div>
        </>


        {!waitingApiResponse && foods.length === 0 && !showDrinks &&
          <>
            <p>Não há itens nessa categoria</p>
            <EmptyContent/> 
          </>
        }

        <button className="btn" onClick={function(){postOrder()}}>Realizar pedido</button>
      </div>
    </>
  )
}

export default NovaComanda;