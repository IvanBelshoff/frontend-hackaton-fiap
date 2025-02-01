"use client";
import {
    createContext,
    useCallback,
    useState,
    useContext
} from 'react';

interface ICountTimerContext {
    isPaused: boolean;
    togglePause: () => void;
}
const CountTimerContext = createContext({} as ICountTimerContext);

export const useCountTimerContext = () => {
    return useContext(CountTimerContext);
};

type ICountTimerProvider = Readonly<{ children: React.ReactNode }>;

export const CountTimerProvider = ({ children }: ICountTimerProvider) => {

    const [isPaused, setIsPaused] = useState(false);

    const togglePause = useCallback(() => {
        setIsPaused(oldPaused => !oldPaused);
    }, []);

    return (
        <CountTimerContext.Provider value={{ isPaused: isPaused, togglePause: togglePause }}>
            {children}
        </CountTimerContext.Provider>
    );
};