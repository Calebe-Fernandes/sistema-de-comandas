/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { api } from "../../../../services/api";
import { toast } from 'react-toastify';
import "../styles.scss";

interface Drink {
  "id": number,
  "price": number,
  "productName": string,
  "description": string,
  "stockAmmount": number,
  "alcoholic": boolean,
  "active": boolean
}

interface Props {
  drink: {
    id: number,
    price: number,
    productName: string,
    description: string,
    stockAmmount: number,
    alcoholic: boolean,
    active: boolean
  };
  closeModal: () => void;
  deleteItem: () => void;
  getDrinks: () => void;
}

const ModalBebida: React.FC<Props> = ({ drink, closeModal, deleteItem, getDrinks }) => {

  function updateDrink(drink: Drink) {
    var updatedDrink = {
      "price": 0,
      "productName": "",
      "description": "",
      "stockAmmount": 0,
      "alcoholic": false,
    };
    updatedDrink = drink;
    var newPrice = parseFloat((document.getElementById("item-" + drink.id + "-price") as HTMLInputElement).value);
    var newDescription = (document.getElementById("item-" + drink.id + "-description") as HTMLInputElement).value;
    var newStockAmmount = parseInt((document.getElementById("item-" + drink.id + "-stockAmmount") as HTMLInputElement).value);
    if (isNaN(newPrice) === false) {
      updatedDrink.price = newPrice;
    }
    if (newDescription !== "") {
      updatedDrink.description = newDescription;
    }
    if (isNaN(newStockAmmount) === false) {
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
  }

  return (
    <div className="drink-modal">
      <div className="modal">
        <div className="modal-background" onClick={closeModal}></div>
        <div className="modal-container">
          <div className="modal-header">
            <div>
              <p>Detalhes do item</p>
              <h4>{drink.productName}</h4>
            </div>
            <button className="close-modal" onClick={closeModal}>
              <FontAwesomeIcon icon={faX} className="closeButton" />
            </button>
          </div>
          <div className="modal-content">
            <div className="form-container">
              <div>
                <label>Alcoólico</label>
                {drink.alcoholic ?
                  <select disabled>
                    <option value="1">Sim</option>
                    <option value="2">Não</option>
                  </select> :
                  <select disabled defaultValue={2}>
                    <option value="1">Sim</option>
                    <option value="2">Não</option>
                  </select>
                }
              </div>
              <div>
                <label>Preço *</label>
                <input id={`item-${drink.id}-price`} type="number" min="1" step="any" placeholder={`R$ ${drink.price.toFixed(2)}`} />
              </div>
              <div>
                <label>Observação *</label>
                <input id={`item-${drink.id}-description`} type="text" placeholder={`${drink.description}`} />
              </div>
              <div>
                <label>Quantidade em estoque *</label>
                <input id={`item-${drink.id}-stockAmmount`} type="number" placeholder={`${drink.stockAmmount}`} />
              </div>
            </div>

            <div className="buttonContainer">
              <button onClick={deleteItem}>Excluir item</button>
              <button onClick={() => updateDrink(drink)}>Atualizar item</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalBebida;