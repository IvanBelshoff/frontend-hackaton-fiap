'use server';

import { PlanosService } from "@/app/services/planos/planosService";
import { IPlano } from "@/app/services/planos/route";
import ReactMarkdown from 'react-markdown';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

export default async function PlanoDetalhes({ params }: { params: { id: string } }) {
    const id = params.id;

    const data = await PlanosService.getById(id);

    let plano: IPlano | undefined = undefined;

    if (data?.sucess) {
        plano = data.sucess.data;
    }

    if (!plano) {
        return (
            <main className='flex flex-col'>
                <div className='flex h-[calc(100vh-61px)] p-4'>
                    <h1>Plano não encontrado</h1>
                </div>
            </main>
        );
    }

    return (
        <main className='flex flex-col'>
            <div className='flex h-[calc(100vh-61px)] overflow-hidden p-6'>

                <div className='max-w-4xl mx-auto w-full overflow-auto '>
                    <div className="mb-4">
                        <Link href="/planos">
                            <Button variant="outline" className="gap-2">
                                <MdOutlineKeyboardArrowLeft  className="h-4 w-4" />
                                Voltar
                            </Button>
                        </Link>
                    </div>
                    <Card >
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">{plano.tema}</CardTitle>
                            <CardDescription className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline">{plano.nivel}</Badge>
                                    <span className="text-sm text-gray-500">
                                        Duração: {plano.duracao}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-500">
                                    Criado em: {format(new Date(plano.data_criacao), 'dd/MM/yyyy HH:mm')}
                                </div>
                                <div className="text-sm text-gray-500">
                                    Atualizado em: {format(new Date(plano.data_atualizacao), 'dd/MM/yyyy HH:mm')}
                                </div>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="prose max-w-none ">
                                <ReactMarkdown>{plano.conteudo}</ReactMarkdown>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </main>
    );
}