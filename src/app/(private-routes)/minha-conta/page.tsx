'use server';

import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route';
import { UsuariosService } from '@/app/services/Usuarios/usuariosService';
import { IPhotoSession, PersonalInfoView } from '@/shared/components/personal-info';
import { Environment } from '@/shared/environment';

import { IUsuarioDetalhado } from '@/shared/interfaces/interface';
import { getServerSession } from 'next-auth';
import React from 'react';


export default async function PageMinhaConta() {

    const session = await getServerSession(nextAuthOptions);

    let usuario: IUsuarioDetalhado | undefined;

    if (!session?.user?.id) {
        return (
            <div>Usuário não encontrado</div>
        );
    }

    const dataUser = await UsuariosService.getUsuarioById(session?.user?.id);

    if (dataUser?.sucess?.data) {
        usuario = dataUser.sucess.data;
    }

    if (!usuario) {
        return (
            <div>Usuário não encontrado</div>
        );
    }

    const defaultPhoto: IPhotoSession = {
        url: `${Environment.BASE_URL}/profile/profile.jpg`,
        nome: "profile.jpg",
        originalname: "profile.jpg",
        height: 462,
        width: 462,
        tamanho: 6758
    };

    return (
        <main className='flex flex-col'>
            <div className='flex h-[calc(100vh-61px)]'>
                <PersonalInfoView usuario={usuario} defaultPhoto={defaultPhoto} />
            </div>
        </main>
    );
};
