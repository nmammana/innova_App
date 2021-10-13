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
    
  } from "@chakra-ui/react"

export default function LogoutAlert({logout}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    return (
        <>
            <IconButton 
                onClick={onOpen}
                icon={<i className="ci-log_out"></i>}
                className="icon-button"/>

            <AlertDialog
                motionPreset="slideInBottom"
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader className="alert-header">Salir de la cuenta</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Está seguro que desea salir?
                    </AlertDialogBody>
                    <AlertDialogFooter className="alert-buttons-container">
                       
                        <Button /* className="logout-button" */ colorScheme="red" onClick={logout} ml={3}>
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
