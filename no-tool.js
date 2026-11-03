// Carica la chiave API dal file .env.
import 'dotenv/config';

// ChatAnthropic permette di inviare messaggi a un modello Anthropic.
import { ChatAnthropic } from '@langchain/anthropic';

// HumanMessage rappresenta il messaggio scritto dall'utente.
import { HumanMessage } from 'langchain';

// Creiamo il modello Anthropic.
const model = new ChatAnthropic({
    model: 'claude-haiku-4-5',
    apiKey: process.env.ANTHROPIC_API_KEY
});

try {
    // Il modello riceve soltanto la domanda dell'utente.
    // Non riceve dati meteorologici in tempo reale.
    const response = await model.invoke([
        new HumanMessage('Che tempo fa a Pisa in questo momento?')
    ]);

    console.log(response.content);
} catch (error) {
    console.error('Errore durante la richiesta meteo:', error);
}