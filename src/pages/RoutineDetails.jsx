import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IconButton } from "@chakra-ui/react"
import RoutineDayCard from '../sections/Routines/RoutineDayCard';
import '../sections/Routines/RoutineDetails.scss';
import Layout from '../components/Layout';
import { RoutinesContext } from '../contexts/RoutinesContext';

import { AuthContext } from '../contexts/AuthContext';

export default function UserDetails(props) {
    const routineId = props.match.params.routineId;
    const {routines} = useContext(RoutinesContext);
    const [routine, setRoutine] = useState({
        title:"",
        user:{
            name:"",
            email:"",
            identityNumber:"",
            birth:"",
            comments:"",
        },
        comments:"",
        days:[],
    });
    const {currentUser} = useContext(AuthContext)
    
    useEffect(() => {        
        const routine = routines.find(routine => (routine.id === routineId));
        setRoutine(routine);
    }, [routines])

    return (
        <Layout>
            {routine && <main className="routine-details">
                <div className="routine-details__wrapper">
                    <section className="heading-container">
                       
                        {!!currentUser && 
                            <Link to="/routines" className="link back-link">
                                <IconButton className="icon-button" icon={<i className="ci-chevron_left"></i>}/>
                            </Link>
                        }
                        <h1 className="heading1 title heading-title">{routine.title}<span className="heading__hide"> - {routine.user.name}</span></h1>
                    </section>

                    <section className="user-data">
                        <p className="name">{routine.user.name}</p>  
                        <p className="id-number">DNI: {routine.user.identityNumber}</p> 
                        {/* <p className="personal-data">Información personal: {user.comments}</p> */}
                        <p className="routine-description">Información de la rutina: {routine.comments}</p>
                    </section> 
                    
                    <section className="routine-days">
                        {routine.days.map((day,index) =>
                            <div key={index}>
                                <RoutineDayCard day={day}/>
                            </div>
                        )}
                    </section>

                    <section>
                        {!!currentUser && <Link to="/routines" className="link">
                            <p className="body1 link-text">Volver a rutinas</p>
                        </Link>}
                    </section>
                </div>
            </main>}
        </Layout>
    )
}
