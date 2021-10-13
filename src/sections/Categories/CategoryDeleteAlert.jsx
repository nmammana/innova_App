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

export default function CategoryDeleteAlert({category, deleteCategory}) {
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
                    <AlertDialogHeader className="alert-header">Eliminar categoría</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Está seguro de que desea eliminar a {category.name} de la lista de categorías?
                    </AlertDialogBody>
                    <AlertDialogFooter className="alert-buttons-container">
                        <Button onClick={()=>{deleteCategory(category)}} ml={3}>
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
