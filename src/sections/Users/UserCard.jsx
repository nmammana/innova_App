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
            <Td className="data-container">
                <p>{name}</p>
            </Td>
    
            <Td className="tools">
                <UserDetails user={user}/>
                <UserEditModal user={user}/>
                <UserDeleteAlert deleteUser={deleteUser} user={user}/>
            </Td>
        </Tr>
        
    )
}
