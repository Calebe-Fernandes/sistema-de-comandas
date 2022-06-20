import React, { useEffect, useState } from "react";
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faX } from "@fortawesome/free-solid-svg-icons"
import { AddButtonComponent, HeaderComponent, Loader, EmptyContent } from "../../components";
import { api } from "../../services/api";
import $ from 'jquery';
import { toast } from 'react-toastify';
import { ModalBebida, ModalPorcao, ModalNovoItem } from "./components";

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

    const [isActiveDrink, setActiveDrink] = useState(false);
    const [isActiveFood, setActiveFood] = useState(false);
    const [isActiveAddItem, setActiveAddItem] = useState(false);
    const [drinkModalData, setDrinkModalData] = useState({
        id: 0,
        price: 0,
        productName: '',
        description: '',
        stockAmmount: 0,
        alcoholic: false,
        active: false
    });
    const [foodModalData, setFoodModalData] = useState({
        id: 0,
        price: 0,
        productName: '',
        description: '',
        isAvaliable: false,
        active: false
    });

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
            .then(() => {
                setWaitingApiResponse(false);
            }
            )
    }, [])

    useEffect(() => {
        document.getElementById('drinkList')?.classList.add('hidden');
        document.getElementById('foodList')?.classList.add('hidden');
        if (!waitingApiResponse) {
            if (!showDrinks) {
                foods.length > 0 && document.getElementById('foodList')?.classList.remove('hidden');
            } else if (showDrinks) {
                drinks.length > 0 && document.getElementById('drinkList')?.classList.remove('hidden');
            }
        }
    }, [showDrinks, waitingApiResponse])

    function getFoodList() {
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
            .then(() => {
                setWaitingApiResponse(false);
            });
    }

    function getDrinkList() {

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

    function toggleAddItem() {
        if (isActiveAddItem) {
            setActiveAddItem(false);
        } else if (!isActiveAddItem) {
            setActiveAddItem(true);
        }
    }

    function deleteItem(item: any) {
        console.log(item)
        item.active = false;
        console.log(item)
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
                closeDrinkModal();
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
                        closeFoodModal();
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

    function handleDrinkModal(drink: drink) {
        setDrinkModalData(drink);
        setActiveDrink(true);
    }

    function closeDrinkModal() {
        setActiveDrink(false);
    }

    function handleFoodModal(food: food) {
        setFoodModalData(food);
        setActiveFood(true);
    }

    function closeFoodModal() {
        setActiveFood(false);
    }

    return (
        <>
            <HeaderComponent user={"manager"} page="stock" />

            <div className="stock-container">
                <div className="menu-options">
                    <button onClick={getDrinkList} className="menu-option active"><p>Bebidas</p></button>
                    <button onClick={getFoodList} className="menu-option"><p>Porções</p></button>
                </div>

                {waitingApiResponse && <div className="loaderWrapper"><Loader /></div>}

                {!waitingApiResponse && drinks.length === 0 && showDrinks &&
                    <EmptyContent />
                }

                {!waitingApiResponse && foods.length === 0 && !showDrinks &&
                    <EmptyContent />
                }

                <div id="drinkList" className="hidden">
                    <table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {drinks.map((drink) => {
                                if (drink.active === true) {
                                    return <tr key={drink.id}>
                                        <td>{drink.productName}</td>
                                        <td className="visualize"><FontAwesomeIcon icon={faEye} className="viewButton" onClick={() => handleDrinkModal(drink)} /></td>
                                    </tr>
                                } else {
                                    return <></>
                                }
                            })}
                        </tbody>
                    </table>
                </div>

                <div id="foodList" className="hidden">
                    <table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {foods.map((food) => {
                                if (food.active === true) {
                                    return <tr key={food.id}>
                                        <td>{food.productName}</td>
                                        <td className="visualize"><FontAwesomeIcon icon={faEye} className="viewButton" onClick={() => handleFoodModal(food)} /></td>
                                    </tr>
                                } else {
                                    return <></>
                                }
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {isActiveDrink &&
                <ModalBebida drink={drinkModalData} closeModal={closeDrinkModal} deleteItem={() => { deleteItem(drinkModalData) }} getDrinks={getDrinkList} />
            }
            {isActiveFood &&
                <ModalPorcao food={foodModalData} closeModal={closeFoodModal} deleteItem={() => { deleteItem(foodModalData) }} getFoods={getFoodList} />
            }
            {isActiveAddItem &&
                <ModalNovoItem closeModal={toggleAddItem} getDrinks={getDrinkList} getFoods={getFoodList} />
            }

            <AddButtonComponent navigate={toggleAddItem} />
        </>
    )
}
export default Estoque;