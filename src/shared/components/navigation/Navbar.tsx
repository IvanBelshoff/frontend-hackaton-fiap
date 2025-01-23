'use client';
import { useDrawerContext } from "@/shared/contexts/DrawerContext";

import { MdMenu, MdOutlineArrowBackIos } from "react-icons/md";

export const Navbar = () => {

    const { toggleMaximize, isMaximized } = useDrawerContext();

    return (
        <div>
            <nav className='flex fixed top-0 right-0 left-0'>

                <div
                    data-active={isMaximized}
                    className={`data-[active=true]:w-[239.2px] w-[70.5px] data-[active=true]:bg-white bg-primary flex items-center data-[active=true]:justify-end data-[active=true]:pr-4 justify-center data-[active=true]:border-b `}
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

                </div>

            </nav >
            <div className='h-14 sm:h-[52px]' />
        </div>

    );

};