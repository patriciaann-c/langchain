// Carica la chiave API dal file .env.
import 'dotenv/config';

// ChatAnthropic è l'adapter LangChain che permette di usare i modelli Anthropic.
import { ChatAnthropic } from '@langchain/anthropic';
import { ChatMistralAI } from '@langchain/mistralai';
import { ChatOpenRouter } from '@langchain/openrouter';

// HumanMessage rappresenta un messaggio scritto dall'utente.
import { HumanMessage } from 'langchain';

// Creiamo il modello indicando il modello Anthropic da utilizzare e la chiave API.
const model = new ChatOpenRouter({
    model: 'nvidia/nemotron-3-ultra-550b-a55b:free',
    apiKey: process.env.OPENROUTER_API_KEY
});

try {
    // Anche se abbiamo un solo messaggio, usiamo sempre un array di HumanMessage.
    const messages = [
        new HumanMessage('Ciao! Spiegami in una frase che cos\'è LangChain.')
    ];

    // invoke() invia l'array di messaggi al modello e attende la risposta.
    const response = await model.invoke(messages);

    // response è un AIMessage. La proprietà content contiene il testo generato.
    console.log('RISPOSTA DEL MODELLO:');
    console.log(response.content);
} catch (error) {
    // Mostriamo un messaggio utile in caso di errore di configurazione o rete.
    console.error('Impossibile contattare Anthropic. Controlla la chiave API e la connessione.', error);
}