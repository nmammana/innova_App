import React from 'react'

import './NotFound.scss'

import NotFoundImg from '../../assets/images/404.png'

export default function NotFound() {
    return (
        <div>
            <h1 className="error-title error-font">Error 404: Page Not Found</h1>
            <div className="img-container"><img src={NotFoundImg} alt="NotFound img"></img></div>
        </div>
    )
}
