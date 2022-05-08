/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./styles.scss";

interface Props {
  navigate: () => void;
}

const AddButtonComponent: React.FC<Props> = ({navigate}) => {

  return (
    <>
      <button className="add-button" onClick={navigate}>
        <FontAwesomeIcon icon={faPlus} className="add-button-icon"/>
      </button>
    </>
  )
}

export default AddButtonComponent;