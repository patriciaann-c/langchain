import 'dotenv/config';
import { ChatOpenRouter } from '@langchain/openrouter';
import { AIMessage, createAgent, HumanMessage } from 'langchain';
import getWeather from './tools/weatherTool.js';
import { z } from 'zod';

const model = new ChatOpenRouter({
    model: 'nvidia/nemotron-3-ultra-550b-a55b:free',
    apiKey: process.env.OPENROUTER_API_KEY
});

const agent = createAgent({
    model,
    tools: [getWeather],
    systemPrompt: `
Sei un analizzatore di recensioni online di un ristorante`,
    responseFormat: z.object({
        sentiment: z.enum(['positiva', 'negativa']),
        score: z.number().min(1).max(5),
        feedback: z.string()
    })
});

// La recensione
const review = "La cotture del filetto era ottima e il condimento delle verdure era eccellente, do il massimo dei voti";

// Cronologia di messaggi
const messages = [];

// Prima chiamata
messages.push(new HumanMessage(
    `Analizza la seguente recensione:
    - dimmi se è (negativa/positiva)
    - un eventuale valore in gradimento da 1 a 5 stelle

    ${review}
    `
));
const response1 = await agent.invoke({
    messages
});

const finalMessage = response1.structuredResponse;
messages.push(new AIMessage(finalMessage));
console.log(finalMessage);