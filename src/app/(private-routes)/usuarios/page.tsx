"use server";

import { UsuariosService } from '@/app/services/Usuarios/usuariosService';
import { Button } from '@/components/ui/button';
import Clear from '@/shared/components/Clear';
import Search from '@/shared/components/Search';
import { TableUsuarios } from '@/shared/components/tables/TableUsuarios';

import { IUsuarioDetalhado } from '@/shared/interfaces/interface';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import { MdAdd } from 'react-icons/md';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'GPL - Gestão de Usuários',
        description: 'Página de gestão de Usuários da GPL.',
    };
};


export default async function PageUsuarios(props: { searchParams?: Promise<{ query?: string }> }) {
    const searchParams = await props.searchParams;

    const filter = searchParams?.query || undefined;
    let usuarios: IUsuarioDetalhado[] = [];
    let total = 0;

    const dataUsers = await UsuariosService.getAllUsuarios(filter);

    if (dataUsers?.sucess) {
        usuarios = dataUsers.sucess.data;
        total = dataUsers.sucess.totalCount;
    }

    return (
        <main className='flex flex-col'>

            <div className='ml-4 mr-4 flex flex-col gap-3 h-[calc(100vh-61px)] py-4'>

                <div className={` flex h-auto w-full  gap-2 justify-center items-center`}>

                    <h1>Usuários: {total}</h1>

                    <Search placeholder={'Pesquisar'} />

                    {filter && (
                        <Clear />
                    )}

                    <Link href='/usuarios/novo'>
                        <Button>
                            Novo
                            <MdAdd />
                        </Button>
                    </Link>

                </div>

                <div className="flex flex-1 w-full">

                    <div className="flex flex-col h-full w-full justify-center items-center p-4 border rounded-lg">
                        <TableUsuarios usuarios={usuarios} />
                    </div>

                </div>
            </div>
        </main >
    );
};
