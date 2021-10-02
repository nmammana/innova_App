import React, { useState } from 'react'
import '../sections/Users/Users.scss';


import Layout from '../components/Layout';

import { Link } from 'react-router-dom'
import UsersList from '../sections/Users/UsersList'

import {
    Box,
    IconButton,
} from "@chakra-ui/react"

export default function Users() {

    return (
        
        <Layout>
            <main className="users-main">
                <div className="users-wrapper">
                    <section className="heading-container">
                        <Link to="/" className="link back-link">
                            <IconButton className="icon-button" icon={<i className="ci-chevron_left"></i>}/>
                        </Link>
                        <h1 className="heading1 title heading-title">Usuarios</h1>
                    </section>
                    
                    <UsersList/> 
                    
                    <section>
                        <Link to="/" className="link">
                            <p className="body1 link-text">Volver al menú</p>
                        </Link>
                    </section>
                </div>
            </main>
        </Layout> 
    )
}
