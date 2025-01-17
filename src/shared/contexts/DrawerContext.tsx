"use client";
import {
    createContext,
    useCallback,
    useState,
    useContext
} from 'react';

interface IDrawerContext {
    isMaximized: boolean;
    toggleMaximize: () => void;
}
const DrawerContext = createContext({} as IDrawerContext);

export const useDrawerContext = () => {
    return useContext(DrawerContext);
};

type IDrawerProvider = Readonly<{ children: React.ReactNode }>;

export const DrawerProvider = ({ children }: IDrawerProvider) => {
    const [isMaximized, setIsMaximized] = useState(false);

    const toggleMaximize = useCallback(() => {
        setIsMaximized(oldMaximized => !oldMaximized);
    }, []);

    return (
        <DrawerContext.Provider value={{ isMaximized: isMaximized, toggleMaximize: toggleMaximize }}>
            {children}
        </DrawerContext.Provider>
    );
};