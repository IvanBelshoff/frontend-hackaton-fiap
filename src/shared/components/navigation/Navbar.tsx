'use client';
import { useDrawerContext } from "@/shared/contexts/DrawerContext";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { MdMenu, MdOutlineArrowBackIos } from "react-icons/md";
import { MenuCount } from "../menus/MenuCount";

interface IFoto {
    nome: string;
    originalname: string;
    width: number;
    height: number;
    url: string;
    tamanho: number;
}

export const Navbar = ({ foto }: { foto: IFoto }) => {

    const { data: session } = useSession(); // Obtém a sessão atual
    const { toggleMaximize, isMaximized } = useDrawerContext();

    const router = useRouter();

    async function logout() {
        await signOut({
            redirect: false
        });

        router.replace('/login');
    }


    return (
        <div>
            <nav className='flex fixed top-0 right-0 left-0'>

                <div
                    data-active={isMaximized}
                    className={`data-[active=true]:w-[240.2px] w-[70.5px] data-[active=true]:bg-white bg-primary flex items-center data-[active=true]:justify-end data-[active=true]:pr-4 justify-center data-[active=true]:border-b `}
                >
                    <button
                        onClick={toggleMaximize}>
                        {isMaximized ? (
                            <MdOutlineArrowBackIos
                                data-teste={isMaximized}
                                className={`data-[teste=true]:text-black text-white`} size={20} />

                        ) : (
                            <MdMenu
                                data-teste={isMaximized}
                                className={`data-[teste=true]:text-black text-white`} size={30} />
                        )}

                    </button>
                </div>

                <div className='flex flex-1 items-center py-2 px-6 md:justify-center bg-primary'>

                    <div className="ml-8">
                        <h1 className={'text-3xl text-white'}>AulaPronta IA</h1>
                    </div>

                    <div className='flex-1' />

                    <MenuCount
                        aoClicarEmMinhaConta={() => router.push('/minha-conta')}
                        aoClicarEmSair={logout}
                        foto={session?.user?.foto || foto}
                    />


                </div>

            </nav >
            <div className='h-14 sm:h-[61px]' />
        </div>

    );

};