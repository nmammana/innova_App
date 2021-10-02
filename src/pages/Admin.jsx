import React from 'react'
import { Link } from 'react-router-dom'

import '../sections/Admin/Admin.scss';

export default function Admin() {
    return (
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
    )
}
