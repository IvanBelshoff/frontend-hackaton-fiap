import { generateText } from 'ai';
import { cohere } from '@ai-sdk/cohere';

export async function POST(req: Request) {
    try {
        // Obter os argumentos do corpo da requisição
        const { tema, nivel, tempo } = await req.json();

        console.log("tema", tema);
        console.log("nivel", nivel);
        console.log("tempo", tempo);

        // Criar o modelo
        const model = cohere('command-r-plus');

        // Configurar o sistema
        const system = `Você é um assistente virtual que cria planos de aula para professores. 
        Você receberá 3 argumentos: 
        - Tema da aula 
        - Nível de escolaridade
        - Tempo de aula 
        Com base nessas informações, monte um plano de aula detalhado e organizado.
        Você retornará o conteúdo no formato Markdown, que pode ser facilmente renderizado e formatado, como títulos, listas, negritos, itálicos, etc.`;


        // Gerar o texto
        const { text } = await generateText({
            model: model,
            system: system,
            prompt: `Tema: ${tema}\nNível: ${nivel}\nTempo: ${tempo}`,
        });

        return Response.json({ text });

    } catch (error) {
        console.error("Error generating text:", error);

        return new Response(
            JSON.stringify({ error: "Ocorreu um erro ao gerar o plano de aula." }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
