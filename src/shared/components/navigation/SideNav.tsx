"use client";
import { ReactNode } from "react";

interface ISideNavProps {
    children: ReactNode;
    navbar: ReactNode
    sidebar: ReactNode
}

export const SideNav = ({ navbar, sidebar, children }: ISideNavProps) => {

    return (
        <div className='w-full h-full flex flex-col'>

            {navbar}

            <div className="flex flex-1">

                {sidebar}

                <div className="flex-1">
                    {children}
                </div>
            </div>

        </div>
    );
};