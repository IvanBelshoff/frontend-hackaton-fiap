'use server';

// imports externos
import React from 'react';
import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';



export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'GPL - Página Inicial',
        description: 'Página inicial do sistema de gestão de pedidos da GPL.',
    };
};

export default async function PageHome() {


    return (
        <main className='flex flex-col'>
            <div className='flex gap-2 h-[calc(100vh-61px)]'>
                <div className='w-full flex bg-slate-50 items-center justify-center'>
                    <Card className='w-[40%] h-[90%] grid grid-rows-[min-content_1fr_min-content]'>
                        <CardHeader>
                            <CardTitle>Chat AI</CardTitle>
                            <CardDescription>Converse com o nosso assistente virtual.</CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div className='flex gap-3 text-slate-600 text-sm'>
                                <Avatar>
                                    <AvatarFallback>IB</AvatarFallback>
                                    <AvatarImage src="https://avatars.githubusercontent.com/u/62076023?v=4" />
                                </Avatar>
                                <p className='leading-relaxed'>
                                    <span className='block font-bold text-slate-700'>Humano:</span>
                                    Olá, eu sou o Igor. Como posso te ajudar hoje?
                                </p>
                            </div>
                            <div className='flex gap-3 text-slate-600 text-sm'>
                                <Avatar>
                                    <AvatarFallback>IA</AvatarFallback>
                                    <AvatarImage src="/ia/IA.png" />
                                </Avatar>
                                <p className='leading-relaxed'>
                                    <span className='block font-bold text-slate-700'>Ia:</span>
                                    Olá, eu sou a IA da GPL. Estou aqui para te ajudar. Como posso te ajudar hoje?
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter className='space-x-2'>
                            <Input placeholder='Oque posso te ajudar ?' />
                            <Button type='submit' >
                                send
                            </Button>
                        </CardFooter>

                    </Card>
                </div>
            </div>
        </main>
    )
}