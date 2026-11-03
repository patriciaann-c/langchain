// Carica la chiave API dal file .env.
import 'dotenv/config';

// ChatAnthropic permette di usare Claude tramite LangChain.
import { ChatAnthropic } from '@langchain/anthropic';

// HumanMessage rappresenta ogni messaggio scritto dall'utente.
import { HumanMessage } from 'langchain';

// Creiamo il modello indicando il modello Anthropic da usare e la chiave API.
const model = new ChatAnthropic({
    model: 'claude-haiku-4-5',
    apiKey: process.env.ANTHROPIC_API_KEY
});

try {
    // Prima chiamata: il modello riceve un array con un solo messaggio.
    const firstResponse = await model.invoke([
        new HumanMessage('Ciao, mi chiamo Samuel.')
    ]);

    console.log('PRIMA RISPOSTA:');
    console.log(firstResponse.content);

    // Seconda chiamata: creiamo un nuovo array con un nuovo messaggio.
    // Il modello non riceve il messaggio precedente.
    const secondResponse = await model.invoke([
        new HumanMessage('Qual è la genesi del mio nome?')
    ]);

    console.log('\nSECONDA RISPOSTA:');
    console.log(secondResponse.content);
} catch (error) {
    // Gestiamo eventuali problemi di configurazione, rete o autenticazione.
    console.error('Errore durante la conversazione:', error);
}