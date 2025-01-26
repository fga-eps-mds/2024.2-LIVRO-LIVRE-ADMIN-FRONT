import { Button, Text, Stack, HStack } from "@chakra-ui/react"
import {
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverRoot,
    PopoverTrigger,
} from "../../../components/ui/popover"
import { BsPerson } from 'react-icons/bs';
import { GoBook } from "react-icons/go";
import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "../../../components/ui/dialog";
import UserPopup from "../UserPopup";
import { useState } from "react";
import BookTitlePopup from "../BookPopup/BookTitlePopup";
import BookAuthorPopup from "../BookPopup/BookAuthorPopup";
import BookThemePopup from "../BookPopup/BookThemePopup";

function SelectFilters() {
    const [popoverOpenUsers, setPopoverOpenUsers] = useState(false);
    const [popoverOpenBooks, setPopoverOpenBooks] = useState(false);

    const handlePopoverUsersToggle = () => {
        setPopoverOpenUsers((prev) => !prev);
        if (!popoverOpenUsers) setPopoverOpenBooks(false);
    };

    const handlePopoverBooksToggle = () => {
        setPopoverOpenBooks((prev) => !prev);
        if (!popoverOpenBooks) setPopoverOpenUsers(false);
    };

    const closePopover = () => {
        setPopoverOpenUsers(false);
        setPopoverOpenBooks(false);
    };

    return (
        <Stack gap={'30px'}>
            <Text>Selecione os Filtros desejados:</Text>
            <HStack>
                <PopoverRoot positioning={{ sameWidth: true }} open={popoverOpenUsers}>
                    <PopoverTrigger asChild>
                        <Button size="sm" variant="outline" minW="xs" onClick={handlePopoverUsersToggle}>
                            <BsPerson /> Usuários
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent width="auto">
                        <PopoverArrow />
                        <PopoverBody>
                            <Stack>
                                <DialogRoot size="cover" placement="center" motionPreset="slide-in-bottom">
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="xs" onClick={closePopover}>
                                            Escolher Usuários
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Escolha os usuários desejados</DialogTitle>
                                            <DialogCloseTrigger />
                                        </DialogHeader>
                                        <DialogBody>
                                            <UserPopup />
                                        </DialogBody>
                                    </DialogContent>
                                </DialogRoot>
                            </Stack>
                        </PopoverBody>
                    </PopoverContent>
                </PopoverRoot>

                <PopoverRoot positioning={{ sameWidth: true }} open={popoverOpenBooks}>
                    <PopoverTrigger asChild>
                        <Button size="sm" variant="outline" minW="xs" onClick={handlePopoverBooksToggle}>
                            <GoBook /> Livros
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent width="auto">
                        <PopoverArrow />
                        <PopoverBody>
                            <Stack>
                                <DialogRoot size="cover" placement="center" motionPreset="slide-in-bottom">
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="xs" onClick={closePopover}>
                                            Escolher por Título
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Escolha os Livros desejados</DialogTitle>
                                            <DialogCloseTrigger />
                                        </DialogHeader>
                                        <DialogBody>
                                            <BookTitlePopup />
                                        </DialogBody>
                                    </DialogContent>
                                </DialogRoot>

                                <DialogRoot size="cover" placement="center" motionPreset="slide-in-bottom">
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="xs" onClick={closePopover}>
                                            Escolher Autores
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Selecione os Autores desejados</DialogTitle>
                                            <DialogCloseTrigger />
                                        </DialogHeader>
                                        <DialogBody>
                                            <BookAuthorPopup />
                                        </DialogBody>
                                    </DialogContent>
                                </DialogRoot>

                                <DialogRoot size="cover" placement="center" motionPreset="slide-in-bottom">
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="xs" onClick={closePopover}>
                                            Escolher Temas
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Selecione os Temas desejados</DialogTitle>
                                            <DialogCloseTrigger />
                                        </DialogHeader>
                                        <DialogBody>
                                            <BookThemePopup />
                                        </DialogBody>
                                    </DialogContent>
                                </DialogRoot>
                            </Stack>
                        </PopoverBody>
                    </PopoverContent>
                </PopoverRoot>
            </HStack>
        </Stack >
    )
}

export default SelectFilters
