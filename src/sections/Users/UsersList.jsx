import React, { useContext, useState } from 'react'
import firebase from 'firebase';
import UserAddModal from './UserAddModal';

import './UsersList.scss';

import {
    Box,
    Input,

    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
  } from "@chakra-ui/react"
import { UsersContext } from '../../contexts/UsersContext';
import UserCard from './UserCard';

export default function UsersList() {
    const db = firebase.firestore();
    const {users, setUsers, IsLoadingUsers, setIsLoadingUsers} = useContext(UsersContext);
    const [searchFilter, setSearchFilter] = useState('');

    const deleteUser = async (userDeleted) =>{
        setIsLoadingUsers(true);
        try{
            await db.collection('users').doc(userDeleted.id).delete()
        }catch(error){
            console.error(error);
        }
        const nonDeletedUsers = users.filter(user => user.id !== userDeleted.id)
        setUsers(nonDeletedUsers);
        setIsLoadingUsers(false);
    }

    return (
        <section className="users-list">
            {users &&
                <div className="toolbar">
                        <Input  type= "text" className= "form-input form-font searchbar" name = "name" 
                                placeholder="Busque un usuario..." onChange={(e)=>setSearchFilter(e.target.value)} value={searchFilter}></Input>
                        <UserAddModal/>     
                </div>
            }
            <Table variant="simple" className="users-table">
                {/* <Thead>
                    <Tr>
                        <Th>Nombre</Th>
                        <Th>Correo</Th>
                    </Tr>
                </Thead> */}
                <Tbody>
                    {users.filter((user) => {
                        if(searchFilter===""){
                            return user;
                        }else if(user.name.toLowerCase().includes(searchFilter.toLowerCase())){
                            return user;
                        }
                    }).map((user)=>(
                        <UserCard
                            user={user}
                            key={user.id}
                            deleteUser={deleteUser}
                        />
                    ))}
                </Tbody>
            </Table>
        </section>
    )
}
