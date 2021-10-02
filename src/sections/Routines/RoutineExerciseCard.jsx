import React from 'react'

import ExerciseVideoModal from '../Exercises/ExerciseVideoModal'
import './RoutineExerciseCard.scss';

import {
    IconButton,
} from "@chakra-ui/react"

export default function RoutineExerciseCard({exercise, deleteExerciseFromDay}) {
    return (
        <div className="routine-exercise-card">
            <div className="text">
                <h2 className="exercise-name">{exercise.exercise.name}</h2>
                
                <p className="description">{exercise.comments}</p>
            </div>

            <div className="exercise-functions">
                <ExerciseVideoModal name={exercise.exercise.name} video={exercise.exercise.video}/>
                {deleteExerciseFromDay && 
                    <IconButton 
                    onClick={()=>deleteExerciseFromDay(exercise)}  
                    className="delete-button" icon={<i className="ci-close_small"></i>}/>}
            </div>
            
            
        </div>
    )
}
