import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import Image from "next/image";

interface IFoto {
    nome: string;
    originalname: string;
    width: number;
    height: number;
    url: string;
    tamanho: number;
}

interface IMenuCountProps {
    foto: IFoto;
    aoClicarEmMinhaConta: () => void;
    aoClicarEmSair: () => void;
}

export const MenuCount = ({ foto, aoClicarEmMinhaConta, aoClicarEmSair }: IMenuCountProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Image
                    src={foto.url}
                    alt={foto.nome}
                    width={45}
                    height={45}
                    className="rounded-full cursor-pointer transition-transform duration-200 hover:scale-105"
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36 mr-6">
                <DropdownMenuGroup>
                    <DropdownMenuItem className={`justify-center cursor-pointer`} onClick={aoClicarEmMinhaConta}>
                        <MdAccountCircle />
                        Minha Conta
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className={`justify-center cursor-pointer`} onClick={aoClicarEmSair}>
                        <MdLogout />
                        Sair
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};