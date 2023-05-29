import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons"

import "./styles.scss";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

interface Props {
  historic?: boolean,
  headerTitle: string,
  content: ReactJSXElement,
  closeModal: () => void,
} 

const ModalComponent: React.FC<Props> = ({ historic, headerTitle, closeModal, content }) => {
  return (
    <div className="modal-component-container">
      <div className="modal-box">
        <div className={`modal-header ${historic ? "historic-header" : "common-header"}`}>
          <p>{ headerTitle }</p>
          <button onClick={closeModal}>
            <FontAwesomeIcon icon={faXmark} className="icon-close-modal" />
          </button>
        </div>
        <div className="modal-content-wrapper">
          { content }
        </div>
      </div>
    </div>
  )
}

export default ModalComponent;