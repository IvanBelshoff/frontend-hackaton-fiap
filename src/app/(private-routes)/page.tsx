'use server';

// imports externos
import React from 'react';
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'API - AulaPronta IA',
        description: 'Página inicial do AulaPronta IA',
    };
};

export default async function PageHome() {


    return (
        <main className='flex flex-col'>
            <div className='flex gap-2 h-[calc(100vh-61px)]'>
                <h1>Aqui será onde o professor cadastrá o plano de aula</h1>
            </div>
        </main>
    )
}