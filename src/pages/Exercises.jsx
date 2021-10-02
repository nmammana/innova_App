import React, { useState } from 'react'
import Layout from '../components/Layout'
import ExercisesList from '../sections/Exercises/ExercisesList'
import { Link } from 'react-router-dom'
import Categories from '../sections/Categories/Categories'
import '../sections/Exercises/Exercises.scss'
import '../assets/icons/coolicons.scss'
import {
    Box,
    Button,
    Flex,
    IconButton,
} from "@chakra-ui/react"

export default function Exercises() {

    return (
        <Layout> 
            <main className="exercises-main">
                <div className="exercises-wrapper">
                    <section className="heading-container">
                        <Link to="/" className="link back-link">
                            <IconButton className="icon-button" icon={<i className="ci-chevron_left"></i>}/>
                        </Link>
                        <h1 className="heading1 title heading-title">Ejercicios</h1>
                    </section>
                    
                    <ExercisesList/>
                    
                    <section className="bottom-links">
                        <Categories/>
                        <Link to="/" className="link">
                            <p className="body1 link-text">Volver al menú</p>
                        </Link>
                    </section>
                </div>
            </main>
        </Layout>
               
    )
}
