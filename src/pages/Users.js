import React, { useState } from 'react'
import '../styles/Users.scss'
import '../styles/Form.scss'
import UserCard from '../components/UserCard';
import Layout from '../components/Layout';
import Loading from '../components/Loading'
import { Link } from 'react-router-dom'
import firebase from 'firebase';

import {
    Box,
    Button,
    Input,
    Textarea,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from "@chakra-ui/react"
//import 'firebase/auth';
//import { auth, useFirebaseApp, useUser } from 'reactfire';

export default function Users() {
    const [isVisible, setIsVisible] = useState(false);  
    const [isAdding, setIsAdding] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        identityNumber: "",
        birth: "",
        comments: ""      
    })
    //const firebase = useFirebaseApp();

    const handleSubmit = (e) =>{
        setIsAdding(false);
        setIsLoading(true);
        createUser(); 
        
        e.preventDefault()
    }

    const createUser = () => {
        firebase.auth().createUserWithEmailAndPassword(form.email,form.identityNumber).then(() => {
            console.log('Register succesfull');
        })
    }

    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }


    

    return (
        <>
            <Layout>
                <h1 className="title heading1">Usuarios</h1>
                {isVisible ? (
                        <>
                            {/* <UsersList/> */}
                            <Box className="button-center">
                                <Button className="button" variant="solid" colorScheme="#5F2F8B" color="#5F2F8B"
                                borderRadius="6px" size="sm" onClick={()=>setIsVisible(false)}>Ocultar lista de usuarios</Button>
                            </Box>
                        </>
                    ):(
                        <Box className="button-center">
                            <Button className="button" variant="solid" colorScheme="#5F2F8B" color="#5F2F8B"
                                borderRadius="6px" size="sm" onClick={()=>setIsVisible(true)}>Ver lista de usuarios</Button>
                        </Box>
                    )}
                {isLoading && <Loading/>}
                {isAdding ? 
                    (
                        <form className="form" onSubmit={handleSubmit}>
                            <FormLabel className="form-font">Nombre completo:</FormLabel>
                            <Box className= "form-center">
                                <Input  type= "text" className= "form-input form-font" /* placeholder= "Nombre completo" */
                                        name = "name" onChange={handleChange} value={form.name} required></Input>
                            </Box>

                            <FormLabel className="form-font">Correo electrónico:</FormLabel>
                            <Box className= "form-center">
                                <Input  type= "email" className= "form-input form-font" /* placeholder= "Correo electrónico" */
                                        name = "email" onChange={handleChange} value={form.email} required></Input>
                            </Box>

                            <FormLabel className="form-font">Número de documento:</FormLabel>
                            <Box className= "form-center">
                                <Input  type= "text" className= "form-input form-font" /* placeholder= "Número de documento" */
                                        name = "identityNumber" onChange={handleChange} value={form.identityNumber} required></Input>
                            </Box>

                            <FormLabel className="form-font">Fecha de Nacimiento:</FormLabel>
                            <Box className= "form-center">
                                <Input  type= "date" className= "form-input date-input form-font" 
                                        name = "birth" onChange={handleChange} value={form.birth} required></Input>
                            </Box>
                            
                            <FormLabel className="form-font">Comentarios:</FormLabel>
                            <Box className= "form-center">
                                <Textarea  type= "text" className= "form-input form-font" /* placeholder= "Comentarios" */
                                        name = "comments" onChange={handleChange} value={form.comments} required
                                        style={{height: '7em'}}>
                                </Textarea>
                            </Box>
                            <UserCard user={form}/>
                            <Box className="button-center">
                                <Button type="submit" variant="solid" colorScheme="#5F2F8B" color="#5F2F8B"
                                borderRadius="6px" size="sm" className="button">Añadir</Button>
                                <Button className="button" variant="solid" colorScheme="#5F2F8B" color="#5F2F8B"
                                borderRadius="6px" size="sm" onClick={()=> setIsAdding(false)}>Cancelar</Button>
                            </Box>

                            
                        </form>
                    ):
                    (<Box className="button-center">
                        <Button className="button" variant="solid" colorScheme="#5F2F8B" color="#5F2F8B"
                                borderRadius="6px" size="sm" onClick={()=> setIsAdding(true)}>Añadir usuario</Button> 
                    </Box>) 
                }
                <Link to="/" className="link">
                    <p className="body1 link-text">Volver al menú</p>
                </Link>
            </Layout>
        </>
    )
}
