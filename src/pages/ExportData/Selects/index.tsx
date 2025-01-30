import { Button, Text, Stack, HStack } from "@chakra-ui/react";
import {
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverRoot,
    PopoverTrigger,
} from "../../../components/ui/popover";
import { BsPerson } from "react-icons/bs";
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
import { FaFileExport } from "react-icons/fa";
import { IoMdBook } from "react-icons/io";
import useApi from "../../../hooks/useApi";
import BookTitlePopup from "../BookPopup/BookTitlePopup";
import BookAuthorPopup from "../BookPopup/BookAuthorPopup";
import BookThemePopup from "../BookPopup/BookThemePopup";
import { mockBooks } from "../BookPopup/BookTitlePopup";

function SelectFilters() {
    const [popoverOpenUsers, setPopoverOpenUsers] = useState(false);
    const [popoverOpenBooks, setPopoverOpenBooks] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
    const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
    const [selectedThemes, setSelectedThemes] = useState<string[]>([]);

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

    const api = useApi();
    const userIds = selectedUsers;

    function filterBooks(selectedBooks: string[], selectedAuthors: string[], selectedThemes: string[]): string[] {
        return mockBooks
            .filter(book =>
                selectedBooks.includes(book.id) ||
                selectedAuthors.includes(book.autor) ||
                selectedThemes.includes(book.tema)
            )
            .map(book => book.id);
    }

    const booksIds: string[] = filterBooks(selectedBooks, selectedAuthors, selectedThemes);

    const handleExportCsv = async () => {
        try {
            await api.exportToCsv(userIds, booksIds);
            alert("Arquivo CSV baixado com sucesso!");
        } catch (error) {
            console.error("Erro ao exportar CSV:", error);
            alert("Não foi possível baixar o arquivo.");
        }
    };

    return (
        <Stack gap={"30px"}>
            <Text>Selecione os Filtros desejados:</Text>
            <Stack>
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
                                <DialogRoot
                                    size="full"
                                    placement="center"
                                    motionPreset="slide-in-bottom"
                                    scrollBehavior="inside"
                                >
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="xs" onClick={closePopover}>
                                            Escolher Usuários
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent
                                        maxW="90vw"
                                        maxH="90vh"
                                        overflow="hidden"
                                        p="4"
                                    >
                                        <DialogHeader>
                                            <DialogTitle>Escolha os usuários desejados</DialogTitle>
                                            <DialogCloseTrigger />
                                        </DialogHeader>
                                        <DialogBody>
                                            <Stack gap="4">
                                                <UserPopup
                                                    onSelectionChange={setSelectedUsers}
                                                    selectedUsers={selectedUsers}
                                                />
                                            </Stack>
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
                            <IoMdBook /> Livros
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent width="auto">
                        <PopoverArrow />
                        <PopoverBody>
                            <Stack>
                                <DialogRoot
                                    size="full"
                                    placement="center"
                                    motionPreset="slide-in-bottom"
                                    scrollBehavior="inside"
                                >
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="xs" onClick={closePopover}>
                                            Filtrar por título
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent
                                        maxW="90vw"
                                        maxH="90vh"
                                        overflow="hidden"
                                        p="4"
                                    >
                                        <DialogHeader>
                                            <DialogTitle>Escolha os livros desejados</DialogTitle>
                                            <DialogCloseTrigger />
                                        </DialogHeader>
                                        <DialogBody>
                                            <Stack gap="4">
                                                <BookTitlePopup
                                                    onSelectionChange={setSelectedBooks}
                                                    selectedBooks={selectedBooks}
                                                />
                                            </Stack>
                                        </DialogBody>
                                    </DialogContent>
                                </DialogRoot>

                                <DialogRoot
                                    size="full"
                                    placement="center"
                                    motionPreset="slide-in-bottom"
                                    scrollBehavior="inside"
                                >
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="xs" onClick={closePopover}>
                                            Escolher Autores
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent
                                        maxW="90vw"
                                        maxH="90vh"
                                        overflow="hidden"
                                        p="4"
                                    >
                                        <DialogHeader>
                                            <DialogTitle>Escolha os autores desejados</DialogTitle>
                                            <DialogCloseTrigger />
                                        </DialogHeader>
                                        <DialogBody>
                                            <Stack gap="4">
                                                <BookAuthorPopup
                                                    onSelectionChange={setSelectedAuthors}
                                                    selectedBooks={selectedAuthors}
                                                />
                                            </Stack>
                                        </DialogBody>
                                    </DialogContent>
                                </DialogRoot>

                                <DialogRoot
                                    size="full"
                                    placement="center"
                                    motionPreset="slide-in-bottom"
                                    scrollBehavior="inside"
                                >
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="xs" onClick={closePopover}>
                                            Escolher Gêneros
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent
                                        maxW="90vw"
                                        maxH="90vh"
                                        overflow="hidden"
                                        p="4"
                                    >
                                        <DialogHeader>
                                            <DialogTitle>Escolha os gêneros desejados</DialogTitle>
                                            <DialogCloseTrigger />
                                        </DialogHeader>
                                        <DialogBody>
                                            <Stack gap="4">
                                                <BookThemePopup
                                                    onSelectionChange={setSelectedThemes}
                                                    selectedBooks={selectedThemes}
                                                />
                                            </Stack>
                                        </DialogBody>
                                    </DialogContent>
                                </DialogRoot>

                            </Stack>
                        </PopoverBody>
                    </PopoverContent>
                </PopoverRoot>

            </Stack>
            <Button mt={"200px"} backgroundColor={"green.100"} disabled={booksIds.length === 0 && userIds.length === 0} onClick={handleExportCsv} w={"320px"}>
                <FaFileExport /> Exportar Dados CSV
            </Button>
        </Stack>
    );
}

export default SelectFilters;
