// tool() trasforma una funzione JavaScript in un tool utilizzabile da LangChain.
import { tool } from 'langchain';

// Zod permette di descrivere e validare gli argomenti del tool.
import { z } from 'zod';

/**
 * Questa funzione contiene la logica del tool meteo.
 *
 * Restituisce sempre lo stesso risultato, indipendentemente dalla città.
 *
 * @param {{ city: string }} parameters - Oggetto ricevuto dal tool.
 * @returns {Promise<string>} Una frase con il meteo simulato.
 */
async function getWeatherFunction({ city }) {
    // Usiamo city solo per evitare un parametro inutilizzato.
    // Nella versione mock non cambia il risultato restituito.
    void city;

    // Il tool restituisce sempre una stringa, non un oggetto JSON.
    return 'Il meteo è sereno con una temperatura di 22 °C.';
}

// Lo schema è separato dalla funzione del tool.
// Specifica che il tool richiede un oggetto con una proprietà city di tipo stringa.
const getWeatherSchema = z.object({
    city: z.string().describe('La città di cui si vuole conoscere il meteo.')
});

// Creiamo il tool collegando la funzione alla sua configurazione.
const getWeather = tool(getWeatherFunction, {
    // Nome tecnico che il modello utilizza per richiamare il tool.
    name: 'get_weather',

    // Descrizione usata dal modello per capire quando usare il tool.
    description: 'Restituisce il meteo attuale di una città italiana.',

    // Schema Zod definito separatamente.
    schema: getWeatherSchema
});

// Esportiamo il tool per poterlo importare nel file dell'agente.
export default getWeather;