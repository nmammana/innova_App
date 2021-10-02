import React from 'react'
import ExerciseEditModal from './ExerciseEditModal';
import ExerciseVideoModal from './ExerciseVideoModal';

import './ExerciseCard.scss'

import {Tr, Td} from "@chakra-ui/react"

import '../../assets/icons/coolicons.scss'
import ExerciseDeleteAlert from './ExerciseDeleteAlert';


export default function ExerciseCard({exercise ,deleteExercise}) {
    const {name, category, video, id} = exercise;
    let videoId = "";

    return (
        <Tr className="exercise-row"> 
            <div className="data-container">
                <Td>{name}</Td>
            </div>
            <div className="tools">
                <Td><ExerciseVideoModal name={name} video={video}/></Td>
                <Td><ExerciseEditModal exercise={exercise}/></Td>
                <Td><ExerciseDeleteAlert exercise={exercise} deleteExercise={deleteExercise}/></Td>
            </div>
        </Tr>
    )
}
