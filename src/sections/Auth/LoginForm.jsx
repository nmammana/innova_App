import React from 'react'
import {
    Button,
    Input,
    FormLabel,
} from "@chakra-ui/react"
import './LoginForm.scss';

export default function LoginForm({handleChange, login, errorMessage, form}) {
    return (
        <main> 
            <div className="login-wrapper">
                <form className= "form login-form" onSubmit={login}>
                    <h1 className= "heading1 title">Ingresar</h1>

                    <div className="input-container">
                        <FormLabel className="form-font form-label">Correo electrónico</FormLabel>
                        <Input  type="email" className= "form-input form-font"
                                name="email" onChange={handleChange} value={form.email}></Input>
                    </div>
                    <div className="input-container">
                        <FormLabel className="form-font form-label">Contraseña</FormLabel> 
                        <Input  type="password" className= "form-input form-font"
                                name="password" onChange={handleChange} value={form.password}></Input>
                    </div>

                    {errorMessage &&
                        <p className="body1 error-message">{errorMessage}</p>}

                    
                    <div className="button-center">
                        <Button className= "button" variant="solid" size="sm" type="submit" >
                            Iniciar sesión
                        </Button>    
                    </div>
                                        
                </form>
            </div>
        </main>
        
    )
}
