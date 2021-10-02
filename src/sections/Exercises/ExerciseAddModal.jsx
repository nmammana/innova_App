import React from 'react'

import {
    Button,
    IconButton,

    
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Flex,
    Box,
} from "@chakra-ui/react"
import '../../assets/icons/coolicons.scss';

import ExerciseForm from './ExerciseForm';

export default function AddExerciseModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <IconButton 
                    m="7.2px 0" className="form-input icon-button"
                    onClick={onOpen}
                    icon={<i className="ci-plus_circle_outline"></i>}/>

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
