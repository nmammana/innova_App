import React from 'react'
import RoutineDetails from './RoutineDetails';
import {Tr, Td} from "@chakra-ui/react"
import RoutineEditModal from './RoutineEditModal';
import RoutineDeleteAlert from './RoutineDeleteAlert';
import RoutineShareAlert from './RoutineShareAlert'
import './RoutineCard.scss';


export default function RoutineCard({routine, deleteRoutine}) {

    const {title, user, comments, days, id} = routine;
    return (
        <Tr className="routine-row"> 
            <div className="data-container">
                <Td>{title} - {user.name}</Td>
            </div>
            
            <div className="tools">
                <Td><RoutineDetails routine={routine}/></Td>
                <Td><RoutineEditModal routine={routine}/></Td>
                <Td><RoutineDeleteAlert deleteRoutine={deleteRoutine} routine={routine}/></Td>
                {/* <Td><RoutineShareAlert routine={routine}/></Td> */}
            </div>
        </Tr>
    )
}
