import React, {useState,useEffect} from "react";
import { toast } from 'react-toastify';
import "./styles.scss";

import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import { api } from "../../services/api";


const Login: React.FC = () => {

    const [password, setPassword] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [isEnable, setIsEnable] = useState<boolean>(false);
    const [user, setUser] = useLocalStorage("user", null);
    const navigate = useNavigate();

    function handlePassword(event:any){
        setPassword(event.target.value);
    }

    function handleUserName(event:any){
        setUserName(event.target.value);
    }

    useEffect(()=>{
        if (password.trim().length !== 0 && userName.trim().length) {
            setIsEnable(true);
        }else{
            setIsEnable(false);
        } 
    },[password,userName])

    function sendRecoveryRequest(){
        toast.warning('Requisite a alteração de senha para seu superior', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
  
    const handleLogin = () => {
        var loginData ={
            "username": userName,
            "password": password
        }

        api.post(`/login`,loginData)
        .then(response => {
        var userData = response.data;
        setUser(userData);
        if(userData.role === "admin"){
            navigate("/adm", { replace: true });
        }else if(userData.role === "manager"){
            navigate("/estoque", { replace: true });
        }else if(userData.role === "cashier"){
            navigate("/caixa/comandas", { replace: true });
        }else if(userData.role === "waiter"){
            navigate("/garcom/comandas", { replace: true });
        }

        toast.success(`Seja bem-vindo novamente ${userData.username.split(' ')[0]}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        }); 
        })
        .catch(error => {
            toast.error('Usuário ou senha não válidos', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }); 
            console.log(error) 
        });
    };

    return( 
        <>
            <header className="login-header"><p>Fazer Login</p></header>
            <div className="login-main-content">
                <div className="login-form">
                    <div className="field-group">
                        <label>Nome de usuário</label>
                        <input type="text" placeholder="Digite seu nome de usuário" onChange={handleUserName}/>           
                    </div>
                    <div className="field-group">
                        <label>Senha</label>
                        <input type="password"  placeholder="Digite sua senha" onChange={handlePassword}/>
                    </div>
                    <a  onClick={sendRecoveryRequest}>Esqueci a senha</a>
                    <div className="field-group">
                    <button className="btn"disabled={!isEnable} onClick={handleLogin}>Entrar</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;