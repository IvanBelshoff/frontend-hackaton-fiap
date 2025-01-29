import { smoothStream, streamText } from 'ai';
import { createCohere } from '@ai-sdk/cohere';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../auth/[...nextauth]/route';

export async function POST(req: Request) {

    const session = await getServerSession(nextAuthOptions);
    const apiKey = session?.user.api_key;

    if (!apiKey) {
        throw new Error("API key is missing in the session.");
    }

    // Inicializa o Cohere com a chave da API
    const cohere = createCohere({ apiKey: apiKey });
    // Get the messages from the request body
    const { messages } = await req.json();

    // Create a model
    const model = cohere('command-r-plus');
    const system = 'Você é um assistente virtual, que pode fornecer informações sobre diversos tópicos, sempre deve responder com respeito e educação. utilizando o idioma português do Brasil.';

    try {
        const result = streamText({
            model: model,
            messages: messages,
            system: system,
            experimental_transform: smoothStream(),
            /*
            tools: {
                weather: tool({
                    description: 'Obtenha a previsão do tempo em um local (fahrenheit)',
                    parameters: z.object({
                        location: z.string().describe('O local para obter a previsão do tempo'),
                    }),
                    execute: async ({ location }) => {
                        const temperature = Math.round(Math.random() * (90 - 32) + 32);
                        return {
                            location,
                            temperature,
                        };
                    },
                }),
                convertFahrenheitToCelsius: tool({
                    description: 'Converta uma temperatura em Fahrenheit para Celsius ',
                    parameters: z.object({
                        temperature: z
                            .number()
                            .describe('A temperatura em Fahrenheit para converter'),
                    }),
                    execute: async ({ temperature }) => {
                        const celsius = Math.round((temperature - 32) * (5 / 9));
                        return {
                            celsius,
                        };
                    },
                }),
            },
            */
        });

        return result.toDataStreamResponse();
    } catch (error) {
        console.error('Error streaming text:', error);
    }

}