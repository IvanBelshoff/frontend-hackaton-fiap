"use server";

import Image from "next/image";
import { format } from "date-fns";
import { getServerSession } from "next-auth";

import DeleteUser from "../DeleteUser";
import { ScrollArea } from "@/components/ui/scroll-area";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MdCheckCircle, MdDelete, MdOutlineRemoveCircle } from "react-icons/md";
import Link from "next/link";
import { IUsuarioDetalhado } from "@/shared/interfaces/interface";

interface TableUsuariosProps {
    usuarios: IUsuarioDetalhado[];
}

export async function TableUsuarios({ usuarios }: TableUsuariosProps) {

    const session = await getServerSession(nextAuthOptions);

    return (
        <div className="flex flex-col h-full w-full justify-center items-center ">

            <ScrollArea className="w-full">
                <Table className={`flex-1`}>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-left">Foto</TableHead>
                            <TableHead className="text-left">Nome</TableHead>
                            <TableHead className="text-left">Status</TableHead>
                            <TableHead className="text-left">Tipo</TableHead>
                            <TableHead className="text-left">Último Login</TableHead>
                            <TableHead className="text-left">Excluir</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {usuarios.map((usuario) => (
                            <TableRow key={usuario.id}>
                                <TableCell>
                                    <Link href={`/usuarios/${usuario.id}/detalhes`}>
                                        <Image
                                            src={usuario.foto.url}
                                            alt={`${usuario.nome} ${usuario.sobrenome}`}
                                            className="rounded-full border border-primary cursor-pointer"
                                            width={30}
                                            height={30}
                                        />
                                    </Link>
                                </TableCell>
                                <TableCell>{`${usuario.nome} ${usuario.sobrenome}`}</TableCell>
                                <TableCell>
                                    {String(usuario.bloqueado) == 'false' ? (

                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <MdCheckCircle size={20} className="text-[#338F59] " />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Usuário ativo</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                    ) : (

                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <MdOutlineRemoveCircle size={20} className="text-error " />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Usuário Bloqueado</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                    )}
                                </TableCell>
                                <TableCell>{usuario.tipo_usuario}</TableCell>
                                <TableCell>
                                    {usuario.ultimo_login ? format(new Date(usuario.ultimo_login), 'dd/MM/yyyy HH:mm:ss') : 'Desconhecido'}
                                </TableCell>
                                <TableCell>
                                    {session?.user?.id == usuario.id ? (
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <MdDelete size={22} className="text-disabled" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{'Você não pode excluir seu próprio usuário'}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    ) : (
                                        <DeleteUser id={usuario.id} usuario={`${usuario.nome} ${usuario.sobrenome}`} />
                                    )}

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollArea>
        </div >
    );
}
