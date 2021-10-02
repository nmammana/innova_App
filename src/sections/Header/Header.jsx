import React, { useContext } from 'react'
import './Header.scss'

import firebase from '../../services/FirebaseService'
import logo from '../../assets/images/innova_logo.png'
import '../../assets/icons/coolicons.scss'

import LogoutAlert from './LogoutAlert';
import { AuthContext } from '../../contexts/AuthContext';

export default function Header(){
    const {isLogged, setIsLogged} = useContext(AuthContext);
    const auth = firebase.auth();   

    const logout = async () =>{
        await auth.signOut()
        console.log('Logout succesfull');
        setIsLogged(false);
    }

    return (
        <header>
            <div className="header-wrapper">
                <section className="logo-container">
                    <a className="logo" href="#">
                        <img src={logo} alt="logo"/>
                    </a>
                </section>

                <section className="logout-container">
                    {isLogged && <LogoutAlert logout={logout}/>}
                </section>
            </div>        
        </header>
        
    )
}
