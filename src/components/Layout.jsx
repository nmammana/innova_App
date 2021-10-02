import React from 'react'
import Header from '../sections/Header/Header'
import Footer from '../sections/Footer/Footer'


export default function Layout({children}) {
    return (
        <>
            <Header/>
            {children}
            <Footer/>
        </>
    )
}
