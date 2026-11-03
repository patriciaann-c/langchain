// Carica la chiave API dal file .env.
import 'dotenv/config';

// ChatAnthropic è l'adapter LangChain che permette di usare i modelli Anthropic.
import { ChatAnthropic } from '@langchain/anthropic';

// HumanMessage rappresenta un messaggio scritto dall'utente.
import { AIMessage, HumanMessage } from 'langchain';

// Creiamo il modello indicando il modello Anthropic da utilizzare e la chiave API.
const model = new ChatAnthropic({
    model: 'claude-haiku-4-5',
    apiKey: process.env.ANTHROPIC_API_KEY
});

try {
    // Anche se abbiamo un solo messaggio, usiamo sempre un array di HumanMessage.
    const messages = [];

    messages.push(
        new HumanMessage('Ciao, mi chiamo Patricia')
    )
    // invoke() invia l'array di messaggi al modello e attende la risposta.
    const response1 = await model.invoke(messages);

    // response è un AIMessage. La proprietà content contiene il testo generato.
    console.log(response1.content);

    messages.push(new AIMessage(response1.content))

    console.log('===============');

    messages.push(
        new HumanMessage('Mi dici la genesi del mio nome')
    )

    const response2 = await model.invoke(messages);

    console.log(response2.content);
} catch (error) {
    // Mostriamo un messaggio utile in caso di errore di configurazione o rete.
    console.error('Impossibile contattare Anthropic. Controlla la chiave API e la connessione.', error);
}