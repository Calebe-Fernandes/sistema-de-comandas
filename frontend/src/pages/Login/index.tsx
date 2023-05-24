import React, { useEffect, useState } from "react";
import { useParams } from "react-router"
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { AddButtonComponent, CommandHeaderComponent } from "../../components";
import { api } from "../../services/api";
import "./styles.scss";


const Login: React.FC = () => {

return( 
    <>
        <h1>This is the login page</h1>
    </>
)
}

export default Login;