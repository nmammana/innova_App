import React, { useState } from 'react'
import Layout from '../components/Layout'
import ExerciseList from '../components/ExerciseList'
import { Link } from 'react-router-dom'
import Categories from '../components/Categories'
import ExerciseSelectedContextProvider from '../contexts/ExerciseSelectedContext'

import {
    Box,
    Button,
} from "@chakra-ui/react"

export default function Exercises() {
    const [isCatVisible, setisCatVisible] = useState(false);

    return (
        <>
            <Layout>
                <ExerciseSelectedContextProvider>
                    <h1 className="heading1 title" style={{padding: '1em 0'}}>Lista de ejercicios</h1>
                    <ExerciseList/>
                    {isCatVisible ? (
                        <>  
                            <Categories/>
                            <Box className="button-center">
                                <Button className="button" variant="solid" colorScheme="#5F2F8B" color="#5F2F8B"
                                borderRadius="6px" size="sm" onClick={()=>setisCatVisible(false)}>Cancelar</Button>
                            </Box>
                        </>
                    ):(
                        <Box className="button-center">
                            <Button className="button" variant="solid" colorScheme="#5F2F8B" color="#5F2F8B"
                                borderRadius="6px" size="sm" onClick={()=>setisCatVisible(true)}>Ver Categorías</Button>
                        </Box>
                    )}
                        
                    <Link to="/" className="link">
                        <p className="body1 link-text">Volver al menú</p>
                    </Link>
                </ExerciseSelectedContextProvider>
            </Layout>
        </>        
    )
}
