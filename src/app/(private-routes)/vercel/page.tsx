'use client';

// imports externos
import React from 'react';
import { useChat } from 'ai/react';

export default function PageVercel() {

    const { messages, input, handleInputChange, handleSubmit } = useChat({
        maxSteps: 5,
    });

    return (
        <main className='flex flex-col'>
            <div className='flex gap-2 h-[calc(100vh-61px)]'>
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
                </div>
            </div>
        </main>
    )
}