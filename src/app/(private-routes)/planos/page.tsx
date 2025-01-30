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
import { MdOutlineOpenInNew } from 'react-icons/md';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import DeletePlano from '@/shared/components/DeletePlano';
import Search from '@/shared/components/Search';
import Clear from '@/shared/components/Clear';

export default async function Planos(props: { searchParams?: Promise<{ query?: string }> }) {
    const searchParams = await props.searchParams;

    const filter = searchParams?.query || undefined;
    const data = await PlanosService.getAll(undefined, undefined, filter);

    let planos: IPlano[] = [];
    let total = 0;
    if (data?.sucess) {
        planos = data.sucess.data;
        total = data.sucess.totalCount;
    }

    return (
        <main className='flex flex-col'>
            <div className='flex h-[calc(100vh-61px)] p-4'>
                <div className="w-full">
                    {/* Cabeçalho com título e botão de ação */}
                    <div className="flex flex-col justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Planos de Aula</h1>
                        <div className='flex w-full h-auto gap-2 py-2 justify-center items-center'>
                            <h1>Planos: {total}</h1>

                            <Search placeholder={'Pesquisar'} />

                            {filter && (
                                <Clear />
                            )}
                        </div>

                    </div>

                    <div className="flex flex-col overflow-y-auto w-full justify-center items-center p-4 border rounded-lg">
                        {/* Tabela */}
                        <Table >
                            <TableCaption>Lista de Planos de Aula</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Abrir</TableHead>
                                    <TableHead>Tema</TableHead>
                                    <TableHead>Nível</TableHead>
                                    <TableHead>Conteúdo</TableHead>
                                    <TableHead>Duração</TableHead>
                                    <TableHead>Data de Criação</TableHead>
                                    <TableHead>Data de Atualização</TableHead>
                                    <TableHead>Excluir</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {!planos.length && (
                                    <TableRow>
                                        <TableCell colSpan={8}>
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
                                        </TableCell>
                                        <TableCell className="font-medium">{plano.tema}</TableCell>
                                        <TableCell>{plano.nivel}</TableCell>
                                        <TableCell className="line-clamp-2 max-w-[200px]">{plano.conteudo}</TableCell>
                                        <TableCell>{plano.duracao}</TableCell>
                                        <TableCell>{format(new Date(plano.data_criacao), 'dd/MM/yyyy')}</TableCell>
                                        <TableCell>{format(new Date(plano.data_atualizacao), 'dd/MM/yyyy')}</TableCell>
                                        <TableCell>
                                            <DeletePlano id={plano.id} plano={plano.tema} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </main>
    );
}