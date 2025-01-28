import { generateText } from 'ai';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../auth/[...nextauth]/route';
import { createCohere } from '@ai-sdk/cohere';
import { z } from 'zod'; // Importa o Zod para validação

// Define o esquema de validação com Zod
const requestSchema = z.object({
    tema: z.string().nonempty("O campo 'tema' é obrigatório."),
    nivel: z.string().nonempty("O campo 'nível' é obrigatório."),
    tempo: z.string().nonempty("O campo 'tempo' é obrigatório.")
});

export async function POST(req: Request) {
    try {
        const session = await getServerSession(nextAuthOptions);
        const apiKey = session?.user.api_key;

        if (!apiKey) {
            throw new Error("API key is missing in the session.");
        }

        // Inicializa o Cohere com a chave da API
        const cohere = createCohere({ apiKey: apiKey });

        // Parse e valida os argumentos da requisição com Zod
        const body = await req.json();
        const { tema, nivel, tempo } = requestSchema.parse(body); // Valida o corpo da requisição

        // Configurar o sistema
        const system = `Você é um assistente virtual que cria planos de aula para professores. 
        Você receberá 3 argumentos: 
        - Tema da aula 
        - Nível de escolaridade
        - Tempo de aula 
        Com base nessas informações, monte um plano de aula detalhado e organizado.
        Você retornará o conteúdo no formato Markdown, que pode ser facilmente renderizado e formatado, como títulos, listas, negritos, itálicos, etc.`;

        // Criar o modelo
        const model = cohere('command-r-plus');

        // Gerar o texto
        const { text } = await generateText({
            model: model,
            system: system,
            prompt: `Tema: ${tema}\nNível: ${nivel}\nTempo: ${tempo}`
        });

        return new Response(
            JSON.stringify({ text }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );

    } catch (error) {
        if (error instanceof z.ZodError) {
            // Erros de validação do Zod
            return new Response(
                JSON.stringify({ error: error.errors.map((e) => e.message).join(", ") }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        console.error("Error generating text:", error);

        return new Response(
            JSON.stringify({ error: "Ocorreu um erro ao gerar o plano de aula." }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
