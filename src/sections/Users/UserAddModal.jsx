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
import '../../assets/icons/coolicons.scss'
import UserForm from './UserForm'
import { UsersContext } from '../../contexts/UsersContext';



export default function AddUserModal() {
    const {isLoadingUsers} = useContext(UsersContext);

    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <IconButton
                    m="7.2px 0" className="form-input icon-button"
                    onClick={onOpen}
                    icon={<i className="ci-plus_circle_outline"></i>}
                    disabled={isLoadingUsers}/>

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
