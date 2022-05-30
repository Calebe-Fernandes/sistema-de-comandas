import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useState } from "react";
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons"
import { faX } from "@fortawesome/free-solid-svg-icons"
import { AddButtonComponent, HeaderComponent, Loader } from "../../components";
import { api } from "../../services/api"; 
import EmptyContent from "../../components/EmptyContent";
import $ from 'jquery';
import { Form } from 'react-bootstrap';

type drink = {
    "id": number,
    "price": number,
    "productName": string,
    "description": string,
    "stockAmmount": number,
    "alcoholic": boolean
}
var requestDrink = {
    "id": 0,
    "price": 0,
    "productName": "a",
    "description": "a",
    "stockAmmount": 0,
    "alcoholic": false
}
type food = {
    "id": number,
    "price": number,
    "productName": string,
    "description": string,
    "isAvaliable": boolean
  }


const Estoque: React.FC = () => {

    const [isActive, setActive] = useState(false);
    var [drinks, setDrinks] = useState<drink[]>([]);
    var [foods, setFoods] = useState<food[]>([]);
    var [showDrinks, setShowDrinks] = useState<boolean>(true);
    var [waitingApiResponse, setWaitingApiResponse] = useState<boolean>(true);


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

        setShowDrinks(true);

        api.get("/drinks")
            .then(response => {
                setDrinks(response.data);
            })
            .catch(error => {
                console.log(error)
            })
    }

    function toggle(drinkId: string | number){
        if(isActive){
            setActive(false)
            document.getElementById('drink-' + drinkId)?.classList.add('hidden') ;
        }else if(!isActive){
            setActive(true)
            document.getElementById('drink-' + drinkId)?.classList.remove('hidden') ;
        }
        
    }

    function removeDrink(drink:any){
        console.log(drink)
        api.delete("/drinks/", drink)
        .then(response => {
            console.log(response)
          })
          .catch(error => { 
            console.log(error)
          })
    }


    return(
        <>
            <HeaderComponent user={"manager"} page="stock" />

            

            <div className="stock-container">
                <div className="menu-options">
                    <button onClick={getDrinkList} className="menu-option active"><p>Bebidas</p></button>
                    <button onClick={getFoodList} className="menu-option"><p>Porções</p></button>
                </div>
                <h1>Item</h1>
                <hr />
                    
                    {waitingApiResponse && <div className="loaderWrapper"><Loader/></div>}
                    
                <div id="drinkList" className="hidden">
                {drinks.map((drink) => {
                    return <>
                        <div className="item">
                            <h2>{drink.productName}</h2>
                            <FontAwesomeIcon icon={faEye} className="viewButton" onClick={()=> toggle(drink.id)}/>
                        </div>
                        <hr className="line" />
                        <div id={`drink-${drink.id}`} className="modal hidden" >
                            <div className="modalBackground" onClick={()=> toggle(drink.id)}></div>  
                            <div className="detalhesContainer">
                                <div className="detalhesHeader">
                                    <div>
                                        <h3>Detalhes do item</h3>
                                        <h4>{drink.productName}</h4>   
                                    </div>
                                    <button className="closeModal" onClick={()=> toggle(drink.id)}>
                                        <FontAwesomeIcon icon={faX} className="closeButton"/>
                                    </button> 
                                </div>
                                <div className="atrContainer">
                                    <h5>Alcoólico</h5>
                                    {drink.alcoholic ?
                                        <select disabled className="atr">
                                            <option value="1">Sim</option>
                                            <option value="2">Não</option>
                                        </select> :
                                        <select disabled className="atr">
                                            <option value="2">Não</option>
                                            <option value="1">Sim</option>
                                        </select> 
                                    }
                                    <h5>Preço *</h5>
                                    <input type="number" min="1" step="any" placeholder={`R$ ${drink.price.toFixed(2)}`} className="atr"/>
                                    <h5>Observação *</h5>
                                    <input className="atr" type="text" placeholder={`${drink.description}`} />
                                    <h5>Quantidade em Estoque *</h5>
                                    <input type="number" className="atr" placeholder={`${drink.stockAmmount}`}/>
                                    
                                    
                                    
                                   
                                </div>
                                <div className="buttonContainer">
                                    <button onClick={()=>removeDrink(drink)}>Excluir item</button>
                                    <button>Atualizar item</button>
                                </div>
                            </div>
                        </div>
                    </>
                  })}
                  </div>

                <div id="foodList" className="hidden">
                {foods.map((food) => {
                    return <>
                        <div className="item">
                            <h2>{food.productName}</h2>
                            <FontAwesomeIcon icon={faEye} className="viewButton"/>
                        </div>
                        <hr />
                    </>
                  })}
                </div>
            </div>
        </>
    )
}
export default Estoque;