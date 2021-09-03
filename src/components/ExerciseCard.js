import React from 'react'
import EditExerciseModal from './EditExerciseModal';
import VideoModal from './VideoModal';

import '../styles/ExerciseCard.scss'

import {Tr, Td, IconButton} from "@chakra-ui/react"

import '../assets/icons/coolicons.scss'


export default function ExerciseCard({exercise ,deleteExercise}) {
    const {name, category, video, id} = exercise;
    let videoId = "";

    if(video){
        let urlSplit = video.split(".");
        if(urlSplit.length>2 && urlSplit[1]==="youtube"){
            if(video.includes("v=")){
                videoId = video.split('v=')[1];
            }
            if(videoId.includes('&')){
                const ampersantPosition = videoId.indexOf('&');
                if(ampersantPosition !== -1){
                    videoId = videoId.substring(0,ampersantPosition);
                }
            }
        }
    }

    return (
        
        <Tr> 
            <Td>{name}</Td>
            <Td>{category}</Td>
            <Td><VideoModal 
                name={name} 
                video={video}/>
            </Td>
            <Td><IconButton 
                    onClick={async ()=>{deleteExercise(exercise)}} 
                    icon={<i className="ci-trash_empty"></i>}/>
            </Td>
            <Td><EditExerciseModal
                    exercise={exercise}/></Td>
        </Tr>
    )
}
