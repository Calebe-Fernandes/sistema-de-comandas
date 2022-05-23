import React from "react";
import { CommandHeaderComponent } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck, faSquare } from "@fortawesome/free-regular-svg-icons";
import "./styles.scss";

const NovaComanda: React.FC = () => {
  const items = [
    {
      "id": 22,
      "price": 35.0,
      "productName": "Batata com Cheddar e Bacon Grande",
      "description": "Porção para até 4 pessoas da melhor batata da região!",
      "isAvaliable": true
    },
    {
      "id": 19,
      "price": 6.0,
      "productName": "Coca Cola Lata",
      "description": "Coquinha geladinha hmmmm",
      "stockAmmount": null,
      "alcoholic": false
    },
    {
      "id": 24,
      "price": 6.0,
      "productName": "Fanta Laranja",
      "description": "Hmmmmm",
      "stockAmmount": 90,
      "alcoholic": false
    },
    {
      "id": 2,
      "price": 8.0,
      "productName": "teste",
      "description": "teste",
      "stockAmmount": 80,
      "alcoholic": false
    }
  ];

  const checkbox = document.getElementById(
    'subscribe',
  ) as HTMLInputElement | null;
  
  if (checkbox != null) {
    // ✅ Set checkbox checked
    checkbox.checked = true;
    // 👇️ true
    console.log(checkbox.checked);
    // ✅ Set checkbox unchecked
    checkbox.checked = false;
  }

  return (
    <>
      <CommandHeaderComponent title="Nova Comanda" />

      <div className="new-command-container">

        <label htmlFor="table">Mesa</label>
        <input type="text" id="table" name="table"/>

        <div className="menu-options">
          <div className="menu-option active"><p>Porções</p></div>
          <div className="menu-option"><p>Bebidas</p></div>
        </div>

        <form action="">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Item</th>
                <th>Quant.</th>
              </tr>
            </thead>
            <tbody>
            {items.map((item) => {
              return <>
                <tr>
                  <td><FontAwesomeIcon icon={faSquare} /></td>
                  <td>{ item.productName }</td>
                  <td><input type="text" /></td>
                </tr>
              </>
            })}
            </tbody>
          </table>
        </form>
        <button className="btn">Realizar pedido</button>
      </div>
    </>
  )
}

export default NovaComanda;