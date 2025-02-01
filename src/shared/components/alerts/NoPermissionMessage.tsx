"use client";
import { redirect } from "next/navigation";
import Lotties from "../Lotties";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MdOutlinePauseCircleOutline, MdOutlinePlayCircleOutline } from "react-icons/md";

import { useCountTimerContext } from "@/shared/contexts/CountTimerContext";
import { CountdownTimer } from "./CountdownTimer";

export const NoPermissionMessage = () => {

    const { isPaused, togglePause } = useCountTimerContext();

    return (
        <main className="flex h-full flex-col items-center justify-center">
            <div className={`flex flex-row w-full gap-2 h-[calc(100vh-61px)]`}>
                <div className="w-[50%] h-full flex flex-col items-center justify-evenly">
                    <h1 className="text-2xl font-bold text-center">
                        Você não tem permissão para acessar esta página.
                    </h1>

                    <CountdownTimer initialSeconds={10} onComplete={() => redirect(`/`)} />

                </div>
                <div className="w-[50%] h-full flex flex-col justify-evenly gap-6 items-center">
                    <div className="w-[70%] h-auto flex flex-col border rounded-lg p-6 gap-6 items-center justify-start">
                        <Lotties type="denied" width={200} height={200} />

                        <div className="w-full flex flex-col gap-6">
                            <div className="w-full flex gap-6 items-center justify-center">
                                {isPaused ? (
                                    <Button onClick={togglePause}>
                                        <MdOutlinePlayCircleOutline />
                                        Continuar redirecionamento
                                    </Button>
                                ) : (
                                    <Button onClick={togglePause}>
                                        <MdOutlinePauseCircleOutline />
                                        Pausar redirecionamento
                                    </Button>
                                )}

                            </div>
                        </div>

                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Visualizar detalhes</AccordionTrigger>
                                <AccordionContent>
                                    <h2 className="text-base text-center">
                                        Somente administradores podem acessar esta página
                                    </h2>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>
        </main>
    );
};
