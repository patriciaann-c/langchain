import { createAgent } from "langchain";
import openRouterModel from "../models/openrouter.js";

const agentPsy = createAgent({
    model: openRouterModel,
    systemPrompt: `
    Sei uno pscichiatra che interpreta alla lettera la filosofia di Jung.
    Sai interpretare i sogni come Freud e suggerisce sempre problemi affettivi
    con la figura genitoriale
`
});

export default agentPsy;