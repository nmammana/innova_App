import React from 'react'
import '../styles/Header.scss'

import logo from '../assets/images/innova_logo.png'

export default function Header(){
    return (
        
        <div className='logo-container'>
            <img src={logo} alt="logo"></img>
        </div>
    )
}
