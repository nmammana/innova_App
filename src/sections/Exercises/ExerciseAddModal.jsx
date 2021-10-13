import React, { useContext } from 'react'

import {
    IconButton,    
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react"
import '../../assets/icons/coolicons.scss';

import ExerciseForm from './ExerciseForm';
import { ExercisesContext } from '../../contexts/ExercisesContext';

export default function AddExerciseModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {isLoadingExercises} = useContext(ExercisesContext);

    return (
        <>
            <IconButton 
                    m="7.2px 0" className="form-input icon-button"
                    onClick={onOpen}
                    icon={<i className="ci-plus_circle_outline"></i>}
                    disabled={isLoadingExercises}/>

            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                <ModalHeader className="heading2 title">Nuevo ejercicio</ModalHeader>
                <ModalCloseButton className="button"/>
                <ModalBody>
                    <ExerciseForm onClose={onClose}/>
                </ModalBody> 

                
                </ModalContent>
            </Modal>
        </>
    )
}
