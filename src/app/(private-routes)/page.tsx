"use client";

// imports externos
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { HiOutlineChevronDoubleRight } from "react-icons/hi";
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';


export default function PageHome() {

    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        tema: '',
        nivel: '',
        tempo: ''
    });
    const [generation, setGeneration] = useState('');

    return (
        <main className="flex flex-col">
            <div className="relative flex h-[calc(100vh-52px)]">
                {/* Primeira coluna */}
                <div className="w-1/2 flex h-full py-4 pl-4 pr-2">
                    <div className="flex w-full flex-col gap-4 justify-center items-center h-full border rounded-lg border-primary p-4">

                        <h1>Gerador de plano de aula</h1>

                        <div className="flex flex-col gap-4 w-full p-4">
                            {/* Tema de Aula */}
                            <div>
                                <label htmlFor="tema" className="block text-sm font-medium text-gray-700">
                                    Tema de Aula
                                </label>
                                <Input
                                    type="text"
                                    id="tema"
                                    name="tema"
                                    onChange={(e) => setForm({ ...form, tema: e.target.value })}
                                    placeholder="Digite o tema da aula"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                />
                            </div>

                            {/* Nível de Escolaridade */}
                            <div>
                                <label htmlFor="nivel" className="block text-sm font-medium text-gray-700">
                                    Nível de Escolaridade
                                </label>
                                <Input
                                    type="text"
                                    id="nivel"
                                    name="nivel"
                                    onChange={(e) => setForm({ ...form, nivel: e.target.value })}
                                    placeholder="Ex: Fundamental, Médio"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                />
                            </div>

                            {/* Tempo de Aula */}
                            <div>
                                <label htmlFor="tempo" className="block text-sm font-medium text-gray-700">
                                    Tempo de Aula (horas)
                                </label>
                                <Input
                                    type="time"
                                    id="tempo"
                                    name="tempo"
                                    onChange={(e) => setForm({ ...form, tempo: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                />
                            </div>

                        </div>
                        <Button
                            disabled={isLoading}
                            onClick={async () => {
                                setIsLoading(true);

                                try {
                                    const response = await fetch('/api/aula', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                            tema: form.tema,
                                            nivel: form.nivel,
                                            tempo: form.tempo,
                                        }),
                                    });

                                    if (response.ok) {
                                        const json = await response.json();
                                        setGeneration(json.text); // Recebe o texto gerado pela API
                                    } else {
                                        console.error('Erro ao gerar o plano de aula:', response.statusText);
                                    }
                                } catch (error) {
                                    console.error('Erro na requisição:', error);
                                } finally {
                                    setIsLoading(false);
                                }
                            }}
                            className="pointer-events-auto"
                        >
                            {isLoading ? 'Gerando...' : 'Gerar aula'}
                            <HiOutlineChevronDoubleRight />
                        </Button>

                    </div>
                </div>

                <div className="w-1/2 flex h-full py-4 pl-2 pr-4">
                    {generation ? (
                        <div className="flex flex-col w-full h-full border rounded-lg border-primary p-4 gap-4 overflow-y-auto">
                            <h1>Plano de Aula Gerado</h1>
                            <p>{generation}</p>
                        </div>
                    ) : (
                        <div className="flex flex-col w-full h-full border rounded-lg border-primary p-4 gap-4">
                            {/* Skeleton para o título */}
                            <Skeleton className="h-6 w-1/3" />

                            {/* Skeleton para o texto (linhas longas e curtas) */}
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-4/5" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                    )}

                </div>
            </div>
        </main >

    )
}