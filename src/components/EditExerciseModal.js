import React from 'react'

import '../assets/icons/coolicons.scss'
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
                    onClick={onOpen}
                    icon={<i className="ci-edit"></i>}/>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                <ModalHeader className="heading2" color="#5F2F8B">Modificar ejercicio</ModalHeader>
                <ModalCloseButton className="button"/>
                <ModalBody>
                    <ExerciseForm onClose={onClose} exercise={exercise}/>
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
