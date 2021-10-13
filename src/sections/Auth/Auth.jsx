import React, { useState, useContext, useEffect } from 'react'

import firebase from '../../services/FirebaseService';
import LoginForm from './LoginForm';
import {Redirect} from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

export default function Auth(){
    const [errorMessage, setErrorMessage] = useState("");
    const {currentUser} = useContext(AuthContext);

    const [form, setForm] = useState({
        email:"",
        password:"",
    })

    /* useEffect(() => {
        if(!isAuthenticated){
            setForm({...form, password:""});
        }
    }, [isAuthenticated]) */

    const login = async (e) => {
        e.preventDefault();
        if(!form.email || !form.password){
            setErrorMessage("Usuario o contraseña no válidos. Por favor vuelva a registrarse");
        }else{
            try{
                await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
                await firebase.auth().signInWithEmailAndPassword(form.email,form.password);
            }catch(error){
                console.error('Login error: ', error);
            }
        } 
    }

    useEffect(() => {
        console.log('Entra a Login')
        console.log('LOGIN Current user', currentUser)
    }, [])

    if(currentUser){
        return <Redirect to={"/"}/>
    }

    const handleChange = (e) => {
        setForm({...form, [e.target.name]:e.target.value});
    }

    return (
        <LoginForm 
            handleChange={handleChange}
            login={login}
            errorMessage={errorMessage}
            form={form}
        />      
    ) 
}
