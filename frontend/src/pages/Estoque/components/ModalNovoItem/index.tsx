/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { api } from "../../../../services/api";
import { toast } from 'react-toastify';
import "../styles.scss";

interface Props {
  closeModal: () => void;
  getDrinks: () => void;
  getFoods: () => void;
}

const ModalNovoItem: React.FC<Props> = ({closeModal, getDrinks, getFoods}) => {
  const [isFood, setIsFood] = useState(false);

  function toggleType() {
    if (isFood) {
        setIsFood(false);
        document.getElementById('food-addItem')?.classList.add('hidden');
        document.getElementById('drink-addItem-quantity')?.classList.remove('hidden');
        document.getElementById('drink-addItem-alcohol')?.classList.remove('hidden');
    } else if (!isFood) {
        setIsFood(true);
        document.getElementById('food-addItem')?.classList.remove('hidden');
        document.getElementById('drink-addItem-quantity')?.classList.add('hidden');
        document.getElementById('drink-addItem-alcohol')?.classList.add('hidden');
    }
  }

  function addItem() {
    var type = (document.getElementById("type") as HTMLInputElement).value;
    if (type === "1") {
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
        if (alc === "1") {
            newDrink.alcoholic = true;
        } else {
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
            .then(() => { getDrinks(); })
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
    } else {
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
        if (iA === "1") {
            newFood.isAvaliable = true;
        } else {
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
                (document.getElementById("item-addItem-name") as HTMLInputElement).value = "";
                (document.getElementById("item-addItem-description") as HTMLInputElement).value = "";
                (document.getElementById("item-addItem-isAvaliable") as HTMLInputElement).value = "1";
            })
            .then(() => { getFoods(); })
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

  return (
    <div className="add-item-modal">
      <div className="modal">
        <div className="modal-background" onClick={closeModal}></div>
        <div className="modal-container">
          <div className="modal-header">
            <div>
              <h2>Adicionar novo item ao cardápio</h2>
            </div>
            <button className="close-modal" onClick={closeModal}>
              <FontAwesomeIcon icon={faX} />
            </button>
          </div>

          <div className="form-container">
            <div>
              <label>Tipo</label>
              <select id="type" onChange={toggleType}>
                <option value="1">Bebida</option>
                <option value="2">Porção</option>
              </select>
            </div>
            <div>
              <label>Nome</label>
              <input id={"item-addItem-name"} type="text" min="1" step="any" />
            </div>
            <div>
              <label>Preço *</label>
              <input id={"item-addItem-price"} type="number" min="1" step="any" />
            </div>
            <div>
              <label>Descrição *</label>
              <input id={"item-addItem-description"} type="text" />
            </div>
            <div id="drink-addItem-quantity">
              <label>Quantidade em estoque</label>
              <input id="item-addItem-stockAmount" type="number" />
            </div>
            <div id="drink-addItem-alcohol">
              <label>Alcoólico</label>
              <select id="item-addItem-alcoholic" defaultValue={2}>
                <option value="1">Sim</option>
                <option value="2">Não</option>
              </select>
            </div>
            <div id="food-addItem" className="hidden">
              <label>Disponibilidade</label>
              <select id="item-addItem-isAvaliable" defaultValue={1}>
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
  )
}

export default ModalNovoItem;