import React, { useEffect, useState } from "react";
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faX} from "@fortawesome/free-solid-svg-icons"
import { AddButtonComponent, HeaderComponent, Loader } from "../../components";
import { api } from "../../services/api"; 
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';

interface drink {
    "id": number,
    "price": number,
    "productName": string,
    "description": string,
    "stockAmmount": number,
    "alcoholic": boolean,
    "active": boolean
}
  
  interface food {
    "id": number,
    "price": number,
    "productName": string,
    "description": string,
    "isAvaliable": boolean,
    "active": boolean
}

const Estoque: React.FC = () => {

    const [isActive, setActive] = useState(false);
    const [isActiveAddItem, setActiveAddItem,] = useState(false);
    const [isFood, setIsFood] = useState(false);
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
              console.log(error);
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
                console.log(error);
            })
            .then( () => {
                setWaitingApiResponse(false);
        });
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
                console.log(error);
        });
    }

    function toggle(itemId: string | number){
        if(isActive){
            setActive(false);
            document.getElementById('item-' + itemId)?.classList.add('hidden');
        }else if(!isActive){
            setActive(true);
            document.getElementById('item-' + itemId)?.classList.remove('hidden');
        } 
    }
    function toggleAddItem(){
        if(isActiveAddItem){
            setActiveAddItem(false);
            document.getElementById('item-addItem')?.classList.add('hidden');
        }else if(!isActiveAddItem){
            setActiveAddItem(true);
            document.getElementById('item-addItem')?.classList.remove('hidden');
        } 
    }
    function toggleType(){
        if(isFood){
            setIsFood(false);
            document.getElementById('food-addItem')?.classList.add('hidden');
            document.getElementById('drink-addItem')?.classList.remove('hidden');
        }else if(!isFood){
            setIsFood(true);
            document.getElementById('food-addItem')?.classList.remove('hidden');
            document.getElementById('drink-addItem')?.classList.add('hidden');
        } 
    }

    function addItem(){
        var type = (document.getElementById("type") as HTMLInputElement).value;
        if(type==="1"){
            var newDrink = {
                "price": 0,
                "productName": "",
                "description": "",
                "stockAmmount": 0,
                "alcoholic": false,
                "active": true
            };
            newDrink.price = parseFloat((document.getElementById("item-addItem-price") as HTMLInputElement).value);
            newDrink.productName = (document.getElementById("item-addItem-name") as HTMLInputElement).value;
            newDrink.description = (document.getElementById("item-addItem-description") as HTMLInputElement).value;
            newDrink.stockAmmount = parseFloat((document.getElementById("item-addItem-stockAmount") as HTMLInputElement).value);
            const alc = (document.getElementById("item-addItem-alcoholic") as HTMLInputElement).value;  
            if(alc === "1"){
                newDrink.alcoholic = true;  
            }else{
                newDrink.alcoholic = false; 
            }
            api.post("/drinks", newDrink)
            .then(response => {
                toast.success('Item criado com sucesso!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                (document.getElementById("item-addItem-price") as HTMLInputElement).value = "";
                (document.getElementById("item-addItem-name") as HTMLInputElement).value = "";
                (document.getElementById("item-addItem-description") as HTMLInputElement).value = "";
                (document.getElementById("item-addItem-stockAmount") as HTMLInputElement).value = "";
                (document.getElementById("item-addItem-alcoholic") as HTMLInputElement).value = "2";
            })
            .then(()=>{getDrinkList();})
            .catch(error => {
                toast.error(error.response.data.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            });  
        }else{
            var newFood = {
                "id": 0,
                "price": 0,
                "productName": "",
                "description": "",
                "isAvaliable": true,
                "active": true
            };
            newFood.price = parseFloat((document.getElementById("item-addItem-price") as HTMLInputElement).value);
            newFood.productName = (document.getElementById("item-addItem-name") as HTMLInputElement).value;
            newFood.description = (document.getElementById("item-addItem-description") as HTMLInputElement).value;
            const iA = (document.getElementById("item-addItem-isAvaliable") as HTMLInputElement).value;  
            if(iA === "1"){
                newFood.isAvaliable = true;  
            }else{
                newFood.isAvaliable = false; 
            }
            api.post("/food", newFood)
            .then(response => {
                toast.success('Item criado com sucesso!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                (document.getElementById("item-addItem-price") as HTMLInputElement).value = "";
                (document.getElementById("item-addItem-name") as HTMLInputElement).value  = "";
                (document.getElementById("item-addItem-description") as HTMLInputElement).value  = "";
                (document.getElementById("item-addItem-isAvaliable") as HTMLInputElement).value  = "1"; 
            })
            .then(()=>{getFoodList();})
            .catch(error => {
                toast.error(error.response.data.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }); 
        }
    }

    function removeItem(item:any){
        item.active = false;
        api.put("/drinks", item)
            .then(response => {
                toast.success('Item excluído com sucesso!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                    toggle(item.id)
            })
            .catch(error => {
                api.put("/food", item)
                    .then(response => {
                        toast.success('Item excluído com sucesso!', {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            });
                        toggle(item.id)
                    })
                    .catch(error => {
                        toast.error(error.response.data.message, {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            });
                    });
            });
    }

    function updateDrink(drink:drink){
        var updatedDrink = {
            "price": 0,
            "productName": "",
            "description": "",
            "stockAmmount": 0,
            "alcoholic": false,
        };
        updatedDrink=drink;
        var newPrice = parseFloat((document.getElementById("item-"+ drink.id +"-price") as HTMLInputElement).value);
        var newDescription = (document.getElementById("item-"+ drink.id +"-description") as HTMLInputElement).value;
        var newStockAmmount = parseInt((document.getElementById("item-"+ drink.id +"-stockAmmount") as HTMLInputElement).value);
        if(isNaN(newPrice)===false){
            updatedDrink.price = newPrice;
        }
        if(newDescription!==""){
            updatedDrink.description = newDescription;
        }
        if(isNaN(newStockAmmount)===false){
            updatedDrink.stockAmmount = newStockAmmount;
        }
        api.put("/drinks", updatedDrink)
            .then(response => {
                toast.success('Item atualizado com sucesso!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            })
            .catch(error => {
                toast.error(error.response.data.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            });
    }
    function updateFood(food:food){
        var updatedFood = {
            "id": 0,
            "price": 0,
            "productName": "",
            "description": "",
            "isAvaliable": false,
        };
        updatedFood=food;
        var newPrice = parseFloat((document.getElementById("item-"+ food.id +"-price") as HTMLInputElement).value);
        var newDescription = (document.getElementById("item-"+ food.id +"-description") as HTMLInputElement).value;
        var newIsAvaliable = (document.getElementById("item-"+ food.id +"-isAvaliable") as HTMLInputElement).value;
        console.log(newIsAvaliable);
        if(isNaN(newPrice)===false){
            updatedFood.price = newPrice;
        }
        if(newDescription!==""){
            updatedFood.description = newDescription;
        }
        if(newIsAvaliable === "2"){
            updatedFood.isAvaliable = false;
        }else{
            updatedFood.isAvaliable = true;
        }
        api.put("/food", updatedFood)
            .then(response => {
                toast.success('Item atualizado com sucesso!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            })
            .catch(error => {
                toast.error(error.response.data.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            });
    }


    return(
        <>
            <HeaderComponent user={"manager"} page="stock" />
            <AddButtonComponent navigate={toggleAddItem} />
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
                        if(drink.active ===true){
                        return <>
                            <div className="item">
                                <h2>{drink.productName}</h2>
                                <FontAwesomeIcon icon={faEye} className="viewButton" onClick={()=> toggle(drink.id)}/>
                            </div>
                            <hr className="line" />

                            <div id={`item-${drink.id}`} className="modal hidden" >
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
                                            <select disabled defaultValue={2} className="atr">
                                                <option value="1">Sim</option>
                                                <option value="2">Não</option>
                                            </select> 
                                        }
                                        <h5>Preço *</h5>
                                        <input id={`item-${drink.id}-price`} type="number" min="1" step="any" placeholder={`R$ ${drink.price.toFixed(2)}`} className="atr"/>
                                        <h5>Observação *</h5>
                                        <input id={`item-${drink.id}-description`} className="atr" type="text" placeholder={`${drink.description}`} />
                                        <h5>Quantidade em estoque *</h5>
                                        <input id={`item-${drink.id}-stockAmmount`} type="number" className="atr" placeholder={`${drink.stockAmmount}`}/>  
                                    </div>

                                    <div className="buttonContainer">
                                        <button onClick={()=>removeItem(drink)}>Excluir item</button>
                                        <button onClick={()=>updateDrink(drink)}>Atualizar item</button>
                                    </div>
                                </div>
                            </div>
                        </>}
                    })}
                </div>

                <div id="foodList" className="hidden">
                    {foods.map((food) => {
                        if(food.active ===true){
                        return <>
                            <div className="item">
                                <h2>{food.productName}</h2>
                                <FontAwesomeIcon icon={faEye} className="viewButton" onClick={()=> toggle(food.id)}/>
                            </div>
                            <hr className="line" />

                            <div id={`item-${food.id}`} className="modal hidden" >
                                <div className="modalBackground" onClick={()=> toggle(food.id)}></div>  
                                <div className="detalhesContainer">
                                    <div className="detalhesHeader">
                                        <div>
                                            <h3>Detalhes do item</h3>
                                            <h4>{food.productName}</h4>   
                                        </div>
                                        <button className="closeModal" onClick={()=> toggle(food.id)}>
                                            <FontAwesomeIcon icon={faX} className="closeButton"/>
                                        </button> 
                                    </div>
                                    
                                    <div className="atrContainer">
                                        <h5>Preço *</h5>
                                        <input id={`item-${food.id}-price`} type="number" min="1" step="any" placeholder={`R$ ${food.price.toFixed(2)}`} className="atr"/>
                                        <h5>Descrição *</h5>
                                        <input id={`item-${food.id}-description`} className="atr" type="text" placeholder={`${food.description}`} />
                                        <h5>Disponibilidade</h5>
                                        {food.isAvaliable ?
                                            <select id={`item-${food.id}-isAvaliable`} className="atr">
                                                <option value="1">Sim</option>
                                                <option value="2">Não</option>
                                            </select> :
                                            <select id={`item-${food.id}-isAvaliable`} defaultValue={2} className="atr">
                                                <option value="1">Sim</option>
                                                <option value="2">Não</option>
                                            </select> 
                                        }
                                    </div>

                                    <div className="buttonContainer">
                                        <button onClick={()=>removeItem(food)}>Excluir item</button>
                                        <button onClick={()=>updateFood(food)}>Atualizar item</button>
                                    </div>
                                </div>
                            </div>
                        </>}
                    })}
                </div>
                <div id={"item-addItem"} className="modal hidden" >
                    <div className="modalBackground" onClick={()=> toggleAddItem()}></div>  
                    <div className="detalhesContainer">
                        <div className="detalhesHeader">
                            <div>
                                <h2>Adicionar novo item ao cardápio</h2>
                                  
                            </div>
                            <button className="closeModal" onClick={()=> toggleAddItem()}>
                                <FontAwesomeIcon icon={faX} className="closeButton"/>
                            </button> 
                        </div>
                        
                        <div className="atrContainer">
                            <h5>Tipo</h5>
                            <select id="type" onChange={toggleType} className="atr">
                                <option value="1">Bebida</option>
                                <option value="2">Porção</option>
                            </select>
                            <h5>Nome</h5>
                            <input id={"item-addItem-name"} type="text" min="1" step="any" className="atr"/>
                            <h5>Preço *</h5>
                            <input id={"item-addItem-price"} type="number" min="1" step="any" className="atr"/>
                            <h5>Descrição *</h5>
                            <input id={"item-addItem-description"} className="atr" type="text" />
                            <div id="drink-addItem">
                                <h5>Quantidade em estoque</h5>
                                <input id="item-addItem-stockAmount" type="number" className="atr"/>
                                <h5>Alcoólico</h5>
                                <select id="item-addItem-alcoholic" defaultValue={2} className="atr">
                                    <option value="1">Sim</option>
                                    <option value="2">Não</option>
                                </select>
                            </div>
                            <div id="food-addItem" className="hidden">
                                <h5>Disponibilidade</h5>
                                <select id="item-addItem-isAvaliable" defaultValue={1} className="atr">
                                    <option value="1">Sim</option>
                                    <option value="2">Não</option>
                                </select> 
                            </div>
                        </div>

                        <div className="buttonContainer">
                            <button className="addItemButton" onClick={addItem}>Adicionar item</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Estoque;