import React from 'react'
import '../../styles/Alert.scss'

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    IconButton,
    AlertDialogCloseButton,
    Button,
    Box,
    
} from "@chakra-ui/react"

export default function UserDeleteAlert({deleteUser, user}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    return (
        <>

            <IconButton 
                onClick={onOpen} className="icon-button"
                icon={<i className="ci-trash_empty"></i>}/>

            <AlertDialog
                motionPreset="slideInBottom"
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader className="alert-header">Eliminar usuario</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Está seguro de que desea eliminar a {user.name} de la lista de usuarios?
                    </AlertDialogBody>
                    <AlertDialogFooter className="alert-buttons-container">
                       
                        <Button onClick={()=>{deleteUser(user)}} ml={3}>
                            Si
                        </Button>
                        <Button ref={cancelRef} onClick={onClose}>
                            No
                        </Button>
                        
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
