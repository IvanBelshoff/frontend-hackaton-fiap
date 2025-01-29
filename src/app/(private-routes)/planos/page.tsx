'use server';
import { PlanosService } from '@/app/services/planos/planosService';
import { IPlano } from '@/app/services/planos/route';
import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { format } from 'date-fns';
import { MdDeleteOutline, MdOutlineOpenInNew } from 'react-icons/md';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default async function Planos() {
    const data = await PlanosService.getAll();

    let planos: IPlano[] = [];

    if (data?.sucess) {
        planos = data.sucess.data;
    }

    return (
        <main className='flex flex-col'>
            <div className='flex h-[calc(100vh-61px)] p-4'>
                <div className="w-full">
                    {/* Cabeçalho com título e botão de ação */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Planos de Aula</h1>
                    </div>

                    {/* Tabela */}
                    <Table>
                        <TableCaption>Lista de Planos de Aula</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">Ações</TableHead>
                                <TableHead>Tema</TableHead>
                                <TableHead>Nível</TableHead>
                                <TableHead>Conteúdo</TableHead>
                                <TableHead>Duração</TableHead>
                                <TableHead>Data de Criação</TableHead>
                                <TableHead>Data de Atualização</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {!planos.length && (
                                <TableRow>
                                    <TableCell colSpan={7}>
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-full" />
                                            <Skeleton className="h-4 w-full" />
                                            <Skeleton className="h-4 w-full" />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                            {planos.map((plano) => (
                                <TableRow key={plano.id} className="hover:bg-gray-50 transition-colors">
                                    <TableCell className="flex gap-2">
                                        <Link href={`/planos/${plano.id}`}>
                                            <Button variant="ghost" size="icon" className="hover:bg-gray-200">
                                                <MdOutlineOpenInNew size={18} />
                                            </Button>
                                        </Link>
                                        <Button variant="ghost" size="icon" className="hover:bg-red-50 hover:text-red-600">
                                            <MdDeleteOutline size={18} />
                                        </Button>
                                    </TableCell>
                                    <TableCell className="font-medium">{plano.tema}</TableCell>
                                    <TableCell>{plano.nivel}</TableCell>
                                    <TableCell className="line-clamp-2 max-w-[200px]">{plano.conteudo}</TableCell>
                                    <TableCell>{plano.duracao}</TableCell>
                                    <TableCell>{format(new Date(plano.data_criacao), 'dd/MM/yyyy')}</TableCell>
                                    <TableCell>{format(new Date(plano.data_atualizacao), 'dd/MM/yyyy')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </main>
    );
}