import React from 'react'
import ExerciseEditModal from './ExerciseEditModal';
import ExerciseVideoModal from './ExerciseVideoModal';

import './ExerciseCard.scss'

import {Tr, Td} from "@chakra-ui/react"

import '../../assets/icons/coolicons.scss'
import ExerciseDeleteAlert from './ExerciseDeleteAlert';


export default function ExerciseCard({exercise ,deleteExercise}) {
    const {name, video} = exercise;

    return (
        <Tr className="exercise-row"> 
            <Td className="data-container">
                <p>{name}</p>
            </Td>
            
            <Td className="tools">
                <ExerciseVideoModal name={name} video={video}/>
                <ExerciseEditModal exercise={exercise}/>
                <ExerciseDeleteAlert exercise={exercise} deleteExercise={deleteExercise}/>
            </Td> 
        </Tr>
    )
}
