import React, { useState } from 'react'
import '../styles/Form.scss'

export default function LoginForm({login, error}) {
    const [details, setDetails] = useState({username:"", password:""});

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        login(details);
    }

    
    return (
        <form           
            className= "form">
            <h1 className= "heading1" style= {{color: '#5F2F8B'}} >Ingresar</h1>
            {(error != "") ? (<div className="body1" style={{textAlign: 'center', color: '#5F2F8B'}}>{error}</div>): ""}
            {/* <label className="form">Nombre</label> */}
            <input
                type= "email"
                className= "form-input form-font"
                placeholder= "email"
                name = "email"
                onChange={(e)=> setEmail(e.target.value)}
                value={email}
            ></input>
            {/* <label className="form">Descripcion</label> */}
            <input
                type= "password"
                className= "form-input form-font"
                placeholder= "contraseña"
                name = "password"
                onChange={(e)=> setPassword(e.target.value)}
                value={password}
            ></input>

            <button
                className= "form-font"
                onClick = {handleSubmit}
            >
                Crear cuenta
            </button>
            <button
                className= "form-font"
                onClick ={login}
            >
                Iniciar sesión
            </button>
        </form>
    )
}
