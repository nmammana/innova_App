import React, { useState } from 'react'
import LoginForm from './LoginForm';

import Admin from '../pages/Admin';

//import { Redirect, BrowserRouter, Switch } from 'react-router-dom';


export default function Login() {
    const [user, setUser] = useState({username:"", password:""});
    const [error, setError] = useState("");

    const adminUser = {
        username: 'admin',
        password: 'admin'
    }

    const login = (details) => {
        console.log(details);

        if(details.username == adminUser.username && details.password == adminUser.password){
            console.log('Logged In')
            setUser({
                username: details.username,
                password: details.password
            });
        }else{
            console.log("Details do not match!");
            setError("Usuario o contraseña no válidos. Por favor vuelva a registrarse");
        }
    }
    const logout = () => {
        console.log('Logout');
        setUser({ username:"", password:""})
    }
   

    return (
        <>
            {(user.username != "") ? (
            <Admin logout={logout} user = {user}/>) : 
            <LoginForm login={login} error={error}/> }
        </>
    )
}
