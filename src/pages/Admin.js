import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/Admin.scss'

export default function Admin() {
    return (
        <div className="cards-container">
                <Link to="/users" className="card" style={{gridColumn: '1/5'}}>
                    <p className="text heading2">Usuarios</p>
                </Link>
          
                <Link to="/exercises" className="card" style={{gridColumn: '5/9'}}>
                    <p className="text heading2">Ejercicios</p>
                </Link>
          
                <Link to="/new" className="card" style={{gridColumn: '9/13'}}>
                    <p className="text heading2">Rutinas</p> 
                </Link>     
        </div>
    )
}
