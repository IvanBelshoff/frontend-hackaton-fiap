import { generateText } from 'ai';
import { cohere } from '@ai-sdk/cohere';
export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();
  const model = cohere('command-r-plus');
  const { text } = await generateText({
    model: model,
    system: 'Você é um assistente útil.',
    prompt,
  });

  return Response.json({ text });
}