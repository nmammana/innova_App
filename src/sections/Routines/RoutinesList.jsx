import React, { useContext, useEffect, useState } from 'react'
import firebase from 'firebase';

import './RoutinesList.scss';
import {
    Box,
    Input,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
  } from "@chakra-ui/react"
import { RoutinesContext } from '../../contexts/RoutinesContext';
import RoutineAddModal from './RoutineAddModal';
import RoutineCard from './RoutineCard';
import Loading from '../../components/Loading/Loading';
import { UsersContext } from '../../contexts/UsersContext';
import { CategoriesContext } from '../../contexts/CategoriesContext';
import { ExercisesContext } from '../../contexts/ExercisesContext';

export default function RoutinesList() {
    const db = firebase.firestore();
    const {routines, setRoutines, isLoadingRoutines, setIsLoadingRoutines} = useContext(RoutinesContext);
    
    const [searchFilter, setSearchFilter] = useState('');

    const deleteRoutine = async (routineDeleted) =>{
        setIsLoadingRoutines(true);
        try{
            await db.collection('routines').doc(routineDeleted.id).delete()
        }catch(error){
            console.error(error);
        }
        const nonDeletedRoutines = routines.filter(routine => routine.id !== routineDeleted.id)
        setRoutines(nonDeletedRoutines);
        setIsLoadingRoutines(false);
    }

    return (
        <section className="routines-list">
            {routines && 
                <div className="toolbar">    
                        <Input  type= "text" className= "form-input form-font searchbar" name = "name" 
                                placeholder="Busque una rutina..." onChange={(e)=>setSearchFilter(e.target.value)} value={searchFilter}></Input>
                        <RoutineAddModal/>
                </div>
            }
            
            {
                <Table variant="simple">
                    {/* <Thead>
                        <Tr>
                            <Th>Titulo</Th>
                            <Th>Nombre</Th>
                        </Tr>
                    </Thead> */}
                    <Tbody>
                        {routines.filter((routine) => {
                            if(searchFilter===""){
                                return routine;
                            }else if(routine.user.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                                routine.title.toLowerCase().includes(searchFilter.toLowerCase())){
                                return routine;
                            }
                        }).map((routine)=>(
                            <RoutineCard
                                routine={routine}
                                key={routine.id}
                                deleteRoutine={deleteRoutine}
                            />
                        ))}
                    </Tbody>
                </Table>
            }
            {isLoadingRoutines && <Loading/>}
            {!isLoadingRoutines && routines?.length===0 && 
                <p className="message body1">Aún no hay rutinas registradas...</p>
            }

        </section>
    )
}
