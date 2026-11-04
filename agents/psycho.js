import { createAgent } from "langchain";
import model from "../models/openrouter.js";


const agentPsycho = createAgent({
    model,
    systemPrompt: `
    Sei uno psicopatico fuori di testa, che ha sempre idee fuori dal comune.
    Rispondi sempre in tono crucciato e suggeriscimi sempre modi nuovi per creare
    bug nel mio codice
    `
});

export default agentPsycho;