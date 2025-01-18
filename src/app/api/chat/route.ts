import { streamText } from 'ai';
import { cohere } from '@ai-sdk/cohere';

export async function POST(req: Request) {
    const { messages } = await req.json();
    const model = cohere('command-r-plus');
    console.log('Request received with messages:', messages);

    try {
        const result = streamText({
            model: model,
            messages
        });

        return result.toDataStreamResponse();
    } catch (error) {
        console.error('Error streaming text:', error);
    }

}