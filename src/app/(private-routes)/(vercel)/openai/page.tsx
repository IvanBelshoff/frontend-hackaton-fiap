'use client';
import React from 'react';
import { useChat } from 'ai/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

export default function Chat() {

    const { messages, input, handleInputChange, handleSubmit } = useChat({
        maxSteps: 5,
    });

    /*
    
     <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
                    {messages.map(m => (
                        <div key={m.id} className="whitespace-pre-wrap">
                            {m.role === 'user' ? 'User: ' : 'AI: '}
                            {m.toolInvocations ? (
                                <pre>{JSON.stringify(m.toolInvocations, null, 2)}</pre>
                            ) : (
                                <p>{m.content}</p>
                            )}
                        </div>
                    ))}

                    <form onSubmit={handleSubmit}>
                        <input
                            className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
                            value={input}
                            placeholder="Dizer algo..."
                            onChange={handleInputChange}
                        />
                    </form>
                </div>*/

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
                                            <AvatarImage src="https://avatars.githubusercontent.com/u/62076023?v=4" />
                                        </Avatar>
                                    ) : (
                                        <Avatar>
                                            <AvatarFallback>IA</AvatarFallback>
                                            <AvatarImage src="/ia/IA.png" />
                                        </Avatar>
                                    )}
                                    {m.toolInvocations ? (
                                        <pre>{JSON.stringify(m.toolInvocations, null, 2)}</pre>
                                    ) : (
                                        <p>{m.content}</p>
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