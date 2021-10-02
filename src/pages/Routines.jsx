import React from 'react'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'
import '../sections/Routines/Routines.scss';
import {
    Box,
    Button,
    Flex,
    IconButton,
} from "@chakra-ui/react"
import RoutinesList from '../sections/Routines/RoutinesList'

export default function Routines() {
    return (
        <Layout>
            <main className="routines-main">
                <div className="routines-wrapper">
                    <section className="heading-container">
                        <Link to="/" className="link back-link">
                            <IconButton className="icon-button" icon={<i className="ci-chevron_left"></i>}/>
                        </Link>
                        <h1 className="heading1 title heading-title">Rutinas</h1>
                    </section>

                    <RoutinesList/>
                    
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
