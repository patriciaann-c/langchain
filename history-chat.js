// Carica la chiave API dal file .env.
import 'dotenv/config';

// ChatAnthropic permette di usare Claude tramite LangChain.
import { ChatAnthropic } from '@langchain/anthropic';

// HumanMessage rappresenta un messaggio dell'utente.
import { HumanMessage } from 'langchain';

// Creiamo il modello Anthropic.
const model = new ChatAnthropic({
    model: 'claude-haiku-4-5',
    apiKey: process.env.ANTHROPIC_API_KEY
});

// Questo array contiene l'intero storico della conversazione.
const messages = [];

try {
    // Aggiungiamo il primo messaggio dell'utente allo storico.
    messages.push(
        new HumanMessage('Ciao, mi chiamo Samuel.')
    );

    // Inviamo tutto lo storico al modello.
    const firstResponse = await model.invoke(messages);

    // Salviamo nello storico anche la risposta del modello.
    // In questo modo il prossimo turno conoscerà sia domanda sia risposta.
    messages.push(firstResponse);

    console.log('ASSISTENTE:');
    console.log(firstResponse.content);

    // Aggiungiamo il secondo messaggio dell'utente allo stesso array.
    messages.push(
        new HumanMessage('Qual è la genesi del mio nome?')
    );

    // Inviamo nuovamente l'intero storico, non solo l'ultima domanda.
    const secondResponse = await model.invoke(messages);

    // Salviamo anche la seconda risposta nel caso la chat continui.
    messages.push(secondResponse);

    console.log('\nASSISTENTE:');
    console.log(secondResponse.content);

    // Mostriamo quanti messaggi sono stati salvati nello storico.
    console.log(`\nMessaggi nello storico: ${messages.length}`);
} catch (error) {
    // Gestiamo eventuali errori durante la chiamata al modello.
    console.error('Errore durante la gestione dello storico:', error);
}