"use client";

// imports externos
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { HiOutlineChevronDoubleRight } from "react-icons/hi";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";
import { MdClear, MdSave } from "react-icons/md";
import { Loader2 } from "lucide-react";

export default function PageHome() {
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        tema: "",
        nivel: "",
        tempo: "",
    });
    const [generation, setGeneration] = useState("");
    const [error, setError] = useState<string | null>(null); // Estado para erros

    const generateAula = async () => {
        setIsLoading(true);
        setError(null); // Limpa erros ao iniciar uma nova geração

        try {
            const response = await fetch("/api/aula", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
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
                const errorData = await response.json();
                setError(errorData.error || "Ocorreu um erro ao gerar o plano de aula.");
            }
        } catch (err) {
            setError("Erro na requisição. Tente novamente mais tarde.");
            console.error("Erro na requisição:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex flex-col">
            <div
                data-active={generation == ""}
                className="relative flex h-[calc(100vh-61px)] data-[active=true]:justify-center data-[active=true]:items-center"
            >
                <div className="w-1/2 flex h-full py-4 pl-4 pr-2">
                    <div className="flex w-full flex-col gap-4 justify-center items-center h-full rounded-lg">
                        <h1 className="font-bold text-2xl">Gerador de plano de aula</h1>

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
                                    value={form.tema}
                                    disabled={isLoading || generation !== ""}
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
                                    value={form.nivel}
                                    disabled={isLoading || generation !== ""}
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
                                    value={form.tempo}
                                    disabled={isLoading || generation !== ""}
                                    onChange={(e) => setForm({ ...form, tempo: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                />
                            </div>
                        </div>

                        {/* Exibição de erro */}
                        {error && (
                            <div className="text-red-600 text-sm mb-2">
                                {error}
                            </div>
                        )}

                        <Button
                            disabled={isLoading || generation !== ""}
                            onClick={generateAula}
                            className="pointer-events-auto"
                        >
                            {isLoading ? "Gerando..." : "Gerar aula"}
                            <HiOutlineChevronDoubleRight />
                        </Button>
                    </div>
                </div>

                {/* Exibição do plano de aula gerado */}
                {generation && !isLoading && (
                    <div className="w-1/2 flex h-full py-4 pl-2 pr-4">
                        <div className="flex flex-col w-full h-full gap-4 justify-center items-center">
                            <h1 className="text-xl font-light">Plano de Aula</h1>
                            <div style={{ scrollbarWidth: 'none' }} className="flex flex-col w-full h-full border rounded-lg border-primary p-4 gap-4 overflow-y-auto">
                                <ReactMarkdown>{generation}</ReactMarkdown>
                            </div>
                            <div className="flex gap-4">
                                <Button variant={'secondary'} className="border" onClick={() => { setGeneration(""); setError(null); setForm({ tema: "", nivel: "", tempo: "" }) }}>
                                    <MdClear />
                                    Limpar
                                </Button>
                                <Button>
                                    <MdSave />
                                    Salvar
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {isLoading && (
                    <div className="w-1/2 flex h-full py-4 pl-2 pr-4 justify-center items-center flex-col gap-4">
                        <h1 className="text-xl font-light">Gerando plano de aula</h1>
                        <Loader2 className="animate-spin text-primary" size={100} />
                    </div>
                )}
            </div>
        </main>
    );
}
