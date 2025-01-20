'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdHome, MdAccountCircle } from 'react-icons/md';
import { useDrawerContext } from '@/shared/contexts/DrawerContext';
import { Separator } from '@/components/ui/separator';
import { JSX } from 'react';
import { TbMessageChatbot } from "react-icons/tb";

interface IMenuItem {
    name: string;
    href: string;
    hrefVariantes?: string[];
    icon: JSX.Element;
}

export const Sidebar = () => {

    const { isMaximized } = useDrawerContext();
    const currentPath = usePathname();

    const menuItems: IMenuItem[] = [
        {
            name: 'Página Inicial',
            href: '/',
            hrefVariantes: ['/'],
            icon: <MdHome className={`${currentPath === '/' ? 'text-white' : 'text-black'}`} size={22} />
        },
        {
            name: 'Chat Ia',
            href: '/chat',
            hrefVariantes: ['/chat'],
            icon: <TbMessageChatbot className={`${currentPath === '/chat' ? 'text-white' : 'text-black'}`} size={22} />
        }
    ];

    const menuAccount: IMenuItem = {
        name: 'Minha Conta',
        href: '/minha-conta',
        hrefVariantes: ['/minha-conta'],
        icon: <MdAccountCircle className={`${currentPath === '/minha-conta' ? 'text-white' : 'text-black'}`} size={22} />
    };

    return (
        <div>
            <aside
                className={`flex flex-col h-full w-full bg-white border-r text-white transition-all duration-300 shadow-lg ${isMaximized ? 'w-60' : 'w-16'}`}>
                {/* Menu Items */}
                <ul className="flex-1 pr-2 pl-2 mt-4 space-y-4">
                    {menuItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`flex hover:no-underline w-full items-center gap-4 px-4 py-2 rounded-md transition-all ${(item.hrefVariantes?.includes(currentPath)) ? 'bg-primary' : 'hover:bg-secondary/50'}`}
                            >
                                {item.icon}
                                {isMaximized && <span className={`text-sm ${(item.hrefVariantes?.includes(currentPath)) ? 'text-white' : 'text-black'}`}>{item.name}</span>}
                            </Link>
                        </li>
                    ))}
                </ul>


                <div className='pr-2 pl-2 mb-4'>
                    <Separator orientation='horizontal' />
                </div>
                <ul className='pr-2 pl-2 mb-4 space-y-4'>
                    <li>
                        <Link
                            href={menuAccount.href}
                            className={`flex hover:no-underline w-full items-center gap-4 px-4 py-2 rounded-md transition-all ${(menuAccount.hrefVariantes?.includes(currentPath)) ? 'bg-primary' : 'hover:bg-secondary/50'}`}
                        >
                            {menuAccount.icon}
                            {isMaximized && <span className={`text-sm ${(menuAccount.hrefVariantes?.includes(currentPath)) ? 'text-white' : 'text-black'}`}>{menuAccount.name}</span>}
                        </Link>
                    </li>
                </ul>

            </aside>
            <div className={`${isMaximized ? 'w-60' : 'w-16'}`} />
        </div>

    );
};