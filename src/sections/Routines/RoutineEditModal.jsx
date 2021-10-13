import React from 'react'

import '../../assets/icons/coolicons.scss'
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

import RoutineForm from './RoutineForm';

export default function RoutineEditModal({routine}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <IconButton 
                    onClick={onOpen} className="icon-button"
                    icon={<i className="ci-edit"></i>}/>

            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className="heading2 title">Modificar rutina</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <RoutineForm onClose={onClose} routine={routine}/>
                    </ModalBody> 
                </ModalContent>
            </Modal>
        </>
    )
}
