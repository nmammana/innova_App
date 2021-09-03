import React from 'react'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'

export default function Rutines() {
    return (
        <Layout>
            <p className="heading1 title">Rutinas</p>
            <Link to="/" className="link">
                <p className="body1 link-text">Volver al menú</p>
            </Link>
        </Layout>    
    )
}
