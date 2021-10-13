import React, { useContext, useEffect } from 'react'

import './Header.scss'
import { Link } from 'react-router-dom'
import firebase from '../../services/FirebaseService'
import logo from '../../assets/images/innova_logo.png'
import '../../assets/icons/coolicons.scss'

import LogoutAlert from './LogoutAlert';
import { AuthContext } from '../../contexts/AuthContext';
import { withRouter } from 'react-router'

function Header(props){
    const auth = firebase.auth();   
    const {currentUser} = useContext(AuthContext);

    const logout = async () =>{
        await auth.signOut()
        props.history.push("/login");
    }

    return (
        <header>
            <div className="header-wrapper">
                <section className="logo-container">
                    <div className="logo">
                        <Link to={"/"}><img src={logo} alt="logo"/></Link>
                    </div>
                </section>

                <section className="logout-container">
                    {!!currentUser && <LogoutAlert logout={logout}/>}
                </section>
            </div>        
        </header>
        
    )
}

export default withRouter(Header);