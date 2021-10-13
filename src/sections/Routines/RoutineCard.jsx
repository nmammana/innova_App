import React from 'react'
import {Tr, Td} from "@chakra-ui/react"
import RoutineEditModal from './RoutineEditModal';
import RoutineDeleteAlert from './RoutineDeleteAlert';
import './RoutineCard.scss';
import { Link } from 'react-router-dom'

import { IconButton,} from "@chakra-ui/react"
import { withRouter } from 'react-router'

 function RoutineCard({routine, deleteRoutine}) {

    const {title, user} = routine;
    return (
        
        <Tr className="routine-row"> 
            <Td className="data-container">
                <p>{title} - {user.name}</p>
            </Td>
            
            <Td className="tools">
                <Link  to={{
                        pathname: `/routines/${routine.id}`, 
                        state: {routine}
                    }}>
                        <IconButton 
                            className="icon-button"
                            icon={<i className="ci-more_horizontal"></i>}/>
                </Link>
                <RoutineEditModal routine={routine}/>
                <RoutineDeleteAlert deleteRoutine={deleteRoutine} routine={routine}/>
                {/* <RoutineShareAlert routine={routine}/> */}
            </Td>
        </Tr>
            
       
    )
}

export default withRouter(RoutineCard);