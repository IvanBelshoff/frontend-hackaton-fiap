'use client';
import React from 'react';
import { useChat } from 'ai/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useSession } from 'next-auth/react';

export default function Chat() {
    const { data: session } = useSession();
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        maxSteps: 5,
        api: '/api/chat',
    });


    const foto = session?.user.foto;

    console.log(foto);

    /*
    Visulizar as ferramentas invocadas
    {m.toolInvocations && (
             <pre>{JSON.stringify(m.toolInvocations, null, 2)}</pre>
    )}
    */
    return (
        <main className='flex flex-col'>
            <div className='flex gap-2 h-[calc(100vh-61px)]'>

                <div className='w-full flex bg-slate-50 items-center justify-center'>
                    <Card className='w-[40%] h-[90%] grid grid-rows-[min-content_1fr_min-content]'>
                        <CardHeader>
                            <CardTitle>Chat AI</CardTitle>
                            <CardDescription>Converse com o nosso assistente virtual.</CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-4 overflow-y-auto'>
                            {messages.map(m => (
                                <div key={m.id} className="flex gap-3 text-slate-600 text-sm">
                                    {m.role === 'user' ? (
                                        <Avatar>
                                            <AvatarFallback>IB</AvatarFallback>
                                            <AvatarImage src={foto?.url || 'https://avatars.githubusercontent.com/u/62076023?v=4'} />
                                        </Avatar>
                                    ) : (
                                        <Avatar>
                                            <AvatarFallback>IA</AvatarFallback>
                                            <AvatarImage src="/ia/IA.png" />
                                        </Avatar>
                                    )}
                                    {m.content && (
                                        <div className='leading-relaxed'>
                                            <span className='block font-bold text-slate-700'>{m.role === 'user' ? 'Eu' : 'ChatBot'}</span>
                                            <p>{m.content}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </CardContent>
                        <form onSubmit={handleSubmit}>
                            <CardFooter className='space-x-2'>

                                <Input className='flex-1' placeholder='Oque posso te ajudar ?' value={input} onChange={handleInputChange} />
                                <Button type='submit' >
                                    send
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </div>
        </main>
    )
}