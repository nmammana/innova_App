import React from 'react'

import UserEditModal from './UserEditModal'
import './UserCard.scss'
import '../../assets/icons/coolicons.scss'
import {Tr, Td, IconButton} from "@chakra-ui/react"
import UserDetails from './UserDetails'
import UserDeleteAlert from './UserDeleteAlert'

export default function UserCard({user, deleteUser}) {
    const {name, email, identityNumber, birth, comments, id} = user;

    return (
        <Tr className="user-row"> 
            <div className="data-container">
                <Td>{name}</Td>
            </div>
            <div className="tools">
                <Td><UserDetails user={user}/></Td>
                <Td><UserEditModal user={user}/></Td>
                <Td><UserDeleteAlert deleteUser={deleteUser} user={user}/></Td>
            </div>
        </Tr>
        
    )
}
