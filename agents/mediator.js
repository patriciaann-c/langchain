import { createAgent } from "langchain";
import model from "../models/openrouter.js";

const agentMediator = createAgent({
    model,
    systemPrompt: `
    Sei un agente che deve analizzare le opinioni di due agenti molto diversi,
    capirne i pro e contro e suggerire una soluzione che metta d'accordo entrambi.
    `
});

export default agentMediator;