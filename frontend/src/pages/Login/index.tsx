import React, {useState,useEffect} from "react";
import { toast } from 'react-toastify';
import "./styles.scss";


const Login: React.FC = () => {

const [password, setPassword] = useState<string>('');
const [email, setEmail] = useState<string>('');
const [isEnable, setIsEnable] = useState<boolean>(false);
const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


function handlePassword(event:any){
    setPassword(event.target.value);
}

function handleEmail(event:any){
    setEmail(event.target.value);
    if(event.target.value.match(validRegex)){ 
        setIsValidEmail(true);
    }else{
        setIsValidEmail(false);
    }
}

useEffect(()=>{
    console.log(isValidEmail)
    if (password.trim().length !== 0 && email.trim().length && isValidEmail) {
        setIsEnable(true);
    }else{
        setIsEnable(false);
    } 
},[password,email])

function sendRecoveryRequest(){
    toast.success('Uma nova senha foi requisitada ao administrador e chegará ao seu email assim que autorizado', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

return( 
    <>
    <header><p>Fazer Login</p></header>
    <div className="login-main-content">
        <form className="login-form">
            <div className="field-group">
                <label>E-mail</label>
                <input type="text" placeholder="Digite seu e-mail" onChange={handleEmail}/>
                {isValidEmail ? (<p></p>) : <p>Por favor insira um e-mail válido</p>}               
            </div>
            <div className="field-group">
                <label>Senha</label>
                <input type="password"  placeholder="Digite sua senha" onChange={handlePassword}/>
            </div>
            <a  onClick={sendRecoveryRequest}>Esqueci a senha</a>
            <div className="field-group">
              <button className="btn"disabled={!isEnable} >Entrar</button>
            </div>
        </form>
    </div>
    </>
)
}

export default Login;