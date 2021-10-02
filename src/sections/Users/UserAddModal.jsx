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
import '../../assets/icons/coolicons.scss'
import UserForm from './UserForm'



export default function AddUserModal() {

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
                <ModalHeader className="heading2 title">Nuevo usuario</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <UserForm onClose={onClose}/>
                </ModalBody> 

                </ModalContent>
            </Modal>
        </>
    )
}
