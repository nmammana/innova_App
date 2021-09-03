import React from 'react'

import '../styles/UserCard.scss'

export default function UserCard({user}) {
    const {name, email, identityNumber, birth, comments} = user;
    
    let today = new Date();
    let birthDate = new Date(birth);
    let age = today.getFullYear()-birthDate.getFullYear();
  

    return (
        
        name && <div className="user-card">
            <h1 className="heading1 card-title">{name}</h1>
            {email && <p className="heading3 card-text">{email}</p>}
            {identityNumber && <p className="body1 card-text">DNI: {identityNumber}</p>}
            {birth && age && <p className="body1 card-text">Edad: {age} años</p>}
            {comments && <p className="body1 card-text">Comentarios: {comments}</p>}
        </div>
        
    )
}
