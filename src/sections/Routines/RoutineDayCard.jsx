import React from 'react'

import RoutineExerciseCard from './RoutineExerciseCard'
import './RoutineDayCard.scss'

import {
    IconButton,
} from "@chakra-ui/react"
 
export default function RoutineDayCard({day, deleteDay}) {
    return (
        <div className="routine-day-card">
            <div className="heading">
                <p className="title">{day.dayName}</p>
                {deleteDay && 
                    <IconButton 
                    onClick={()=>deleteDay(day.dayName)}  
                    className="delete-button" icon={<i className="ci-close_small"></i>}/>
                }
            </div>

            {day && day.exercises.map((exercise) =>
                <RoutineExerciseCard 
                    key={exercise.exercise.id} 
                    exercise={exercise} 
                    day={day}/>
            )}
        </div>
    )
}
