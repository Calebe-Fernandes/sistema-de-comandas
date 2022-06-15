import React from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import "./styles.scss";

interface Props {
  title: string;
}

const CommandHeaderComponent: React.FC<Props> = ({ title }) => {

  const navigate = useNavigate();

  const navigateToCommands = () => {
    navigate(-1);
  };
  return (
    <>
      <header className="command-header">
        <button className="go-back-button" onClick={navigateToCommands}>
          <FontAwesomeIcon icon={faArrowLeft} className="go-back-button-icon" />
        </button>

        <p>{title}</p>
      </header>
    </>
  )
}

export default CommandHeaderComponent;