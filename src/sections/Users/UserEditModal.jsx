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

import UserForm from './UserForm'

export default function UserEditModal({user}) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <IconButton 
                    onClick={onOpen} className="icon-button"
                    icon={<i className="ci-edit"></i>}/>

            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader className="heading2 title">Modificar usuario</ModalHeader>
                    <ModalCloseButton className="button"/>
                    <ModalBody>
                        <UserForm onClose={onClose} user={user}/>
                    </ModalBody> 
                </ModalContent>
            </Modal>
        </>
    )
}
