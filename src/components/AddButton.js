import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/AddButton.scss'
import addButton from '../assets/images/add.png'

export default function AddButton() {
    return (
        <Link to="/new" className="new-plan">
            <img src={addButton} alt="add-button"></img>
        </Link>
    )
}
