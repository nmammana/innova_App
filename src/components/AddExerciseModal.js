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
import '../assets/icons/coolicons.scss'

import ExerciseForm from './ExerciseForm';

export default function AddExerciseModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <IconButton 
                    m="7.2px 0" className="form-input"
                    onClick={onOpen}
                    icon={<i className="ci-plus_circle_outline"></i>}/>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                <ModalHeader className="heading2" color="#5F2F8B">Nuevo ejercicio</ModalHeader>
                <ModalCloseButton className="button"/>
                <ModalBody>
                    <ExerciseForm onClose={onClose}/>
                </ModalBody> 

                <ModalFooter>
                    <Flex>
                        <Box className="button-center">
                        
                            <Button className="button" variant="solid" colorScheme="#5F2F8B" color="#5F2F8B"
                                    borderRadius="6px" size="sm" onClick={onClose}>
                                Cerrar
                            </Button>
                        </Box>
                    </Flex>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
