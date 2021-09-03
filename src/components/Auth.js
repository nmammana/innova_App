import React, { useState } from 'react'

import firebase from './firebase'

import Admin from '../pages/Admin';
import '../styles/Form.scss'
import {
    Box,
    Button,
    Input,
    FormLabel,
} from "@chakra-ui/react"


export default function Auth(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    /*const handleSubmit = async () => {
        await firebase.auth().createUserWithEmailAndPassword(email,password);
        console.log('Register succesfull');
    }*/

    const login = (e) => {
        e.preventDefault();
        if(email===null || email==="" || password===null || password===""){
            setError("Usuario o contraseña no válidos. Por favor vuelva a registrarse");
        }
        firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
            console.log('Login succesfull');
        })
    }

    const logout = async () =>{
        firebase.auth().signOut().then(()=>{
            console.log('Logout succesfull');
            setPassword("");
        })
    }

    firebase.auth().onAuthStateChanged((user) => {
        if(user){
            setIsLogged(true);
            if(user.email === "admin@admin.com"){
                console.log('admin logged');
                setIsAdmin(true);
            }
        } else{
            setIsLogged(false);
            setIsAdmin(false);
        }
    })

     return (
        
            <>
                {isLogged ? (  
                        isAdmin ? (
                            <>
                                <Admin/>
                                <Box style={{display:'flex', justifyContent: 'center', alignItems: 'center'}} >
                                    <Button className="button" variant="solid" colorScheme="#5F2F8B" color="#5F2F8B"
                                borderRadius="6px" size="sm" onClick={logout}>Cerrar sesion</Button>
                                </Box>                   
                            </>
                        ):(
                            <>
                                <Box style={{display:'flex', justifyContent: 'center', alignItems: 'center'}} >
                                    <Button className="button" variant="solid" colorScheme="#5F2F8B" color="#5F2F8B"
                                borderRadius="6px" size="sm" onClick={logout}>Cerrar sesion</Button>
                                </Box>
                            </>
                        )      
                ):(
                    <form className= "form" onSubmit={login}>
                        <h1 className= "heading1 title" style= {{color: '#5F2F8B'}} >Ingresar</h1>
                        {(error !== "") ? (<Box className="body1" style={{textAlign: 'center', color: '#5F2F8B'}}>{error}</Box>): ""}
                        <FormLabel className="form-font">Correo electrónico</FormLabel>
                        <Box className= "form-center">
                            <Input  type= "email" id="email" className= "form-input form-font"
                                    name = "email"
                                    onChange={(e)=> setEmail(e.target.value)}
                                    value={email}
                            ></Input>
                        </Box>

                        <FormLabel className="form-font">Contraseña</FormLabel> 
                        <Box className= "form-center">
                            <Input  type= "password" id= "password" className= "form-input form-font"
                                    name = "password"
                                    onChange={(e)=> setPassword(e.target.value)}
                                    value={password}
                            ></Input>
                        </Box>
                        
                        <Box className="button-center">
                            <Button className= "button" variant="solid" colorScheme="#5F2F8B" color="#5F2F8B"
                                borderRadius="6px" size="sm" type="submit" >
                                Iniciar sesión
                            </Button>    
                        </Box>
                                            
                    </form>
                )
                }
            </>
    ) 
}
