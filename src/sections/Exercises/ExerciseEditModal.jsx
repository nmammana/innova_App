import React from 'react'

import '../../assets/icons/coolicons.scss'
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

import ExerciseForm from './ExerciseForm'

export default function EditExerciseModal({exercise}) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <IconButton 
                    onClick={onOpen} className="icon-button"
                    icon={<i className="ci-edit"></i>}/>

            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className="heading2 title">Modificar ejercicio</ModalHeader>
                    <ModalCloseButton className="button"/>
                    <ModalBody>
                        <ExerciseForm onClose={onClose} exercise={exercise}/>
                    </ModalBody> 
                </ModalContent>
            </Modal>
        </>
    )
}
