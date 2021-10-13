import React, { useContext } from 'react'

import RoutineForm from './RoutineForm'
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
import '../../assets/icons/coolicons.scss'
import { RoutinesContext } from '../../contexts/RoutinesContext';


export default function RoutineAddModal() {
    const {isLoadingRoutines} = useContext(RoutinesContext);
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <IconButton 
                    m="7.2px 0" className="form-input icon-button"
                    onClick={onOpen}
                    icon={<i className="ci-plus_circle_outline"></i>}
                    disabled={isLoadingRoutines}/>

            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                <ModalHeader className="heading2 title">Nueva rutina</ModalHeader>
                <ModalCloseButton className="button"/>
                <ModalBody>
                    <RoutineForm onClose={onClose}/>
                </ModalBody> 

                </ModalContent>
            </Modal>
        </>
    )
}
