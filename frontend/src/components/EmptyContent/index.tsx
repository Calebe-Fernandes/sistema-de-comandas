import React from 'react'
import noOpenCommandsImage from "../../assets/no-open-commands.svg";
import "./styles.scss";



var EmptyContent : React.FC = () => {
  return (
    <>
      <div className="no-response">
        <p>Não há itens nessa categoria</p>
        <img src={noOpenCommandsImage} alt="Prancheta vazia" />
      </div>
    </>

  )
}

export default EmptyContent
