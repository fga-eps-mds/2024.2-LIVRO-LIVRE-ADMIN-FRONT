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
import useApi from "../../../hooks/useApi";

function SelectFilters() {
    const [popoverOpenUsers, setPopoverOpenUsers] = useState(false);
    const [, setPopoverOpenBooks] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]); // Estado para armazenar os usuários selecionados

    const handlePopoverUsersToggle = () => {
        setPopoverOpenUsers((prev) => !prev);
        if (!popoverOpenUsers) setPopoverOpenBooks(false);
    };

    const closePopover = () => {
        setPopoverOpenUsers(false);
        setPopoverOpenBooks(false);
    };

    const api = useApi();
    const userIds = selectedUsers;

    const handleExportCsv = async () => {
        try {
            await api.exportToCsv(userIds);
            alert("Arquivo CSV baixado com sucesso!");
        } catch (error) {
            console.error("Erro ao exportar CSV:", error);
            alert("Não foi possível baixar o arquivo.");
        }
    };

    return (
        <Stack gap={"30px"}>
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
            </HStack>
            <Button mt={"250px"} backgroundColor={"green.100"} disabled={selectedUsers.length === 0} onClick={handleExportCsv} w={"320px"}>
                <FaFileExport /> Exportar Dados CSV
            </Button>
        </Stack>
    );
}

export default SelectFilters;
