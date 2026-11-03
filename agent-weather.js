// Carica la chiave API dal file .env.
import 'dotenv/config';

// ChatAnthropic permette di usare Claude tramite LangChain.
import { ChatAnthropic } from '@langchain/anthropic';

// createAgent crea un agente che può utilizzare uno o più tool.
// HumanMessage rappresenta il messaggio inviato dall'utente.
import { createAgent, HumanMessage } from 'langchain';

// Importiamo il tool meteo creato nella cartella tools.
import getWeather from './tools/getWeather.js';

// Creiamo il modello indicando il modello Anthropic scelto e la chiave API.
const model = new ChatAnthropic({
    model: 'claude-haiku-4-5',
    apiKey: process.env.ANTHROPIC_API_KEY
});

// Creiamo un agente e gli rendiamo disponibile il tool get_weather.
const agent = createAgent({
    model,
    tools: [getWeather],

    // Il system prompt contiene istruzioni permanenti per l'agente.
    systemPrompt: `
Sei un assistente meteorologico didattico.
Quando l'utente chiede il meteo di una città, usa il tool get_weather.
Dichiara sempre che i dati restituiti provengono da un mock didattico.
`
});

try {
    // Anche agent.invoke() riceve sempre un array di HumanMessage.
    // Non usiamo l'oggetto abbreviato con role e content.
    const result = await agent.invoke({
        messages: [
            new HumanMessage('Che tempo fa a Pisa?')
        ]
    });

    // L'ultimo messaggio prodotto dall'agente è la risposta finale.
    const finalMessage = result.messages.at(-1);

    console.log('RISPOSTA FINALE DELL’AGENTE:');
    console.log(finalMessage.content);
} catch (error) {
    // Gestiamo possibili problemi di configurazione, rete o autenticazione.
    console.error('Errore durante l’esecuzione dell’agente:', error);
}