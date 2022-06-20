/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons"
import { api } from "../../../../services/api";
import { toast } from 'react-toastify';
import "../styles.scss";

interface Food {
  "id": number,
  "price": number,
  "productName": string,
  "description": string,
  "isAvaliable": boolean,
  "active": boolean
}

interface Props {
  food: {
    id: number,
    price: number,
    productName: string,
    description: string,
    isAvaliable: boolean,
    active: boolean
  };
  closeModal: () => void;
  deleteItem: () => void;
  getFoods: () => void;
}

const ModalPorcao: React.FC<Props> = ({ food, closeModal, deleteItem, getFoods }) => {

  function updateFood(food: Food) {
    var updatedFood = {
      "id": 0,
      "price": 0,
      "productName": "",
      "description": "",
      "isAvaliable": false,
    };
    updatedFood = food;
    var newPrice = parseFloat((document.getElementById("item-" + food.id + "-price") as HTMLInputElement).value);
    var newDescription = (document.getElementById("item-" + food.id + "-description") as HTMLInputElement).value;
    var newIsAvaliable = (document.getElementById("item-" + food.id + "-isAvaliable") as HTMLInputElement).value;
    console.log(newIsAvaliable);
    if (isNaN(newPrice) === false) {
      updatedFood.price = newPrice;
    }
    if (newDescription !== "") {
      updatedFood.description = newDescription;
    }
    if (newIsAvaliable === "2") {
      updatedFood.isAvaliable = false;
    } else {
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

  return (
    <div className="food-modal">
      <div className="modal">
        <div className="modalBackground" onClick={closeModal}></div>
        <div className="modal-container">
          <div className="modal-header">
            <div>
              <h3>Detalhes do item</h3>
              <h4>{food.productName}</h4>
            </div>
            <button className="close-modal" onClick={closeModal}>
              <FontAwesomeIcon icon={faX} className="closeButton" />
            </button>
          </div>

          <div className="modal-content">
          <div className="form-container">
            <div>
              <label>Preço *</label>
              <input id={`item-${food.id}-price`} type="number" min="1" step="any" placeholder={`R$ ${food.price.toFixed(2)}`} />
            </div>
            <div>
              <label>Descrição *</label>
              <input id={`item-${food.id}-description`} type="text" placeholder={`${food.description}`} />
            </div>
            <div>
              <label>Disponibilidade</label>
              {food.isAvaliable ?
                <select id={`item-${food.id}-isAvaliable`}>
                  <option value="1">Sim</option>
                  <option value="2">Não</option>
                </select> :
                <select id={`item-${food.id}-isAvaliable`} defaultValue={2}>
                  <option value="1">Sim</option>
                  <option value="2">Não</option>
                </select>
              }
            </div>
          </div>

          <div className="buttonContainer">
            <button onClick={deleteItem}>Excluir item</button>
            <button onClick={() => updateFood(food)}>Atualizar item</button>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalPorcao;