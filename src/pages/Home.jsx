import React, { useContext, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Layout from '../components/Layout';
import { AuthContext } from '../contexts/AuthContext';

import '../sections/Home/Home.scss';

export default function Home() {

    const {currentUser} = useContext(AuthContext);

    useEffect(() => {
        console.log('Entra a Home')
        console.log('LOGIN Current user', currentUser)
    }, [])

    return (
        <Layout>
            
            <main className="admin-home">
                <div className="admin-home__wrapper">
                    <section className="admin-home__cards">
                        <Link to="/users" className="card">
                            <p className="text heading2">Usuarios</p>
                        </Link>
                
                        <Link to="/exercises" className="card">
                            <p className="text heading2">Ejercicios</p>
                        </Link>
                
                        <Link to="/routines" className="card">
                            <p className="text heading2">Rutinas</p> 
                        </Link>     
                    </section>
                </div>
            </main>
        
        </Layout>
    )
}
