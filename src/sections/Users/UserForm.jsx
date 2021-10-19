import React, { useContext, useEffect, useState } from 'react'

import firebase from "firebase/app";
import 'firebase/firestore';

import {
    Box,
    Button,
    Input,
    Textarea,
    FormLabel,
  } from "@chakra-ui/react"
import { UsersContext } from '../../contexts/UsersContext';


export default function UserForm({user, onClose}) {
    const {id} = user ? user : "" ; 
    const db = firebase.firestore();
    const [form, setForm] = useState({
        name: "",
        email: "",
        identityNumber: "",
        birth: "",
        comments: ""      
    })
    const { 
        users, 
        setUsers, 
        setIsLoadingUsers
    } = useContext(UsersContext);

    const capitalize = (word) => {
        return word[0].toUpperCase() + word.slice(1);
    }

    const handleChange = (e) =>{
        setForm({...form, [e.target.name]: e.target.value})
    }

    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setIsLoadingUsers(true);
        if(!id){ 
            createUser();
        }
        else{
            editUser();
        }
        onClose();
        setIsLoadingUsers(false);
        setForm({
            name: "",
            email: "",
            identityNumber: "",
            birth: "",
            comments: ""  
        })
    }

    const createUser = async () =>{
        try{
            db.collection("users").doc(form.identityNumber).set({
            //const {id: userId} = await db.collection('users').add({
                name: capitalize(form.name),
                email : form.email,
                identityNumber : form.identityNumber,
                birth: form.birth,
                comments: form.comments,
            })
            let usersListUpdated = [
                ...users, {
                    name: capitalize(form.name),
                    email : form.email,
                    identityNumber : form.identityNumber,
                    birth: form.birth,
                    comments: form.comments,
                    id: form.identityNumber
                }];
            setUsers(usersListUpdated);
        }catch(error){
            console.error('Error adding user:',error);
        }
    }

    const editUser = async () => {
        try{
            await db.collection('users').doc(id).update({
                name: capitalize(form.name),
                email : form.email,
                identityNumber : form.identityNumber,
                birth: form.birth,
                comments: capitalize(form.comments),
            })
            let usersListUpdated = [];
            users.forEach((user) => {
                if(user.id === id){
                    usersListUpdated.push({ 
                        name: capitalize(form.name),
                        email : form.email,
                        identityNumber : form.identityNumber,
                        birth:  form.birth,
                        comments: capitalize(form.comments), 
                        id:id
                    })
                }else{
                    usersListUpdated.push(user);
                }
            })
            setUsers(usersListUpdated); 
        }catch(error){
            console.error('Error modifying user:',error);
        }
    }

    useEffect(() => {
        if(user){
            setForm({...user});
        }
    },[user])

    return (
        <>
        <form 
            className= "form"
            onSubmit = {handleSubmit}>

            <div className="input-container">
                <FormLabel className="form-font form-label">Nombre completo:</FormLabel>
                <Input  type= "text" className= "form-input form-font"
                        name = "name" onChange={handleChange} value={form.name} required></Input>
            </div>
            
            <div className="input-container">
                <FormLabel className="form-font form-label">Correo electrónico:</FormLabel>
                <Input  type= "email" className= "form-input form-font"
                        name = "email" onChange={handleChange} value={form.email} required></Input>
                
            </div>
            
            <div className="input-container">
                <FormLabel className="form-font form-label">Número de documento:</FormLabel>
                <Input  type= "text" className= "form-input form-font" 
                        name = "identityNumber" onChange={handleChange} value={form.identityNumber} required></Input>
            </div>
            
            <div className="input-container">
                <FormLabel className="form-font form-label">Fecha de Nacimiento:</FormLabel>
                <Input  type= "date" className= "form-input date-input form-font" 
                        name = "birth" onChange={handleChange} value={form.birth} required></Input>
            </div>
            
            <div className="input-container">
                <FormLabel className="form-font form-label">Comentarios:</FormLabel>
                <Textarea   type= "text" className= "form-input form-font" 
                            name = "comments" onChange={handleChange} value={form.comments}>
                </Textarea>
            </div>          
            
            <Box className="button-container">
                    {id ? (
                        <Button className="button" variant="solid" 
                                size="sm" type= "submit" disabled={!form.name}>
                            Guardar cambios
                        </Button>
                    
                    ):(
                        <Button className="button" variant="solid" 
                                size="sm" type= "submit" disabled={!form.name}>
                            Añadir
                        </Button>
                    )}
                    <Button className="button" variant="solid" size="sm" onClick={onClose}>
                        Cerrar
                    </Button>
            </Box>
        </form>
            
        </>
    )
}
