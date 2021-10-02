import React, { useState, useContext, useEffect } from 'react'

import firebase from '../../services/FirebaseService';
import Admin from '../../pages/Admin';
import LoginForm from './LoginForm';

import { AuthContext } from '../../contexts/AuthContext';


export default function Auth(){
    const [errorMessage, setErrorMessage] = useState("");
    const {isLogged, setIsLogged} = useContext(AuthContext);

    const [form, setForm] = useState({
        email:"",
        password:"",
    })

    useEffect(() => {
        if(!isLogged){
            setForm({...form, password:""});
        }
    }, [isLogged])

    const login = (e) => {
        e.preventDefault();
        if(form.email===null || form.email==="" || form.password===null || form.password===""){
            setErrorMessage("Usuario o contraseña no válidos. Por favor vuelva a registrarse");
        }
        firebase.auth().signInWithEmailAndPassword(form.email,form.password).then(()=>{
            console.log('Login succesfull');
        })
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                setIsLogged(true);
            }else{
                setIsLogged(false);
            }
        })
    }, [])

    const handleChange = (e) => {
        setForm({...form, [e.target.name]:e.target.value});
    }

    return (
        <>
            {isLogged ? (
                <Admin/>       
            ):(
                <LoginForm 
                    handleChange={handleChange}
                    login={login}
                    errorMessage={errorMessage}
                    form={form}
                    />
            )}
        </>
    ) 
}
