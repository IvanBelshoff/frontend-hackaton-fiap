"use client";
import { useCountTimerContext } from "@/shared/contexts/CountTimerContext";
import { useEffect, useState } from "react";


interface CountdownTimerProps {
    initialSeconds: number;
    onComplete: () => void;
}

export const CountdownTimer = ({ initialSeconds, onComplete }: CountdownTimerProps) => {

    const [seconds, setSeconds] = useState(initialSeconds);
    
    const { isPaused } = useCountTimerContext();

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;

        if (!isPaused) {
            timer = setInterval(() => {
                setSeconds((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer!);
                        onComplete();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isPaused, onComplete]);

    return (
        <p className="text-gray-700">
            Você será redirecionado em {seconds} segundo{seconds > 1 ? "s" : ""}.
        </p>
    );
};

