"use server";

import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { UsuariosService } from "@/app/services/Usuarios/usuariosService";
import { IPhotoSession } from "@/shared/components/personal-info";
import { Environment } from "@/shared/environment";
import { IUsuarioDetalhado } from "@/shared/interfaces/interface";
import PageDetalhesDeUsuario from "@/shared/pages/usuarios/PageDetalhesDeUsuario";
import { getServerSession } from "next-auth";

export default async function PageUsuario({ params }: { params: Promise<{ idUsuario: string }> }) {

    const session = await getServerSession(nextAuthOptions);

    if (!session?.user?.id) {
        return (
            <div>Usuário não encontrado</div>
        );
    }

    const id = (await params).idUsuario;

    let usuario: IUsuarioDetalhado | undefined;

    const dataUser = await UsuariosService.getUsuarioById(parseInt(id));

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
                <PageDetalhesDeUsuario idUser={session?.user.id} usuario={usuario} defaultPhoto={defaultPhoto} />
            </div>
        </main>
    );
};
