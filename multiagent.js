import 'dotenv/config';
import { HumanMessage } from "langchain";
import agentPsycho from './agents/psycho.js';
import agentPsy from './agents/psy.js';
import agentMediator from './agents/mediator.js'

const question = 'Mi dici una possibile alternativa al petrolio?';

const responsePsycho = await agentPsycho.invoke({
    messages: [new HumanMessage(question)]
});
const responsePsychoText = responsePsycho.messages.at(-1).content;

const responsePsy = await agentPsy.invoke({
    messages: [new HumanMessage(question)]
});
const responsePsyText = responsePsy.messages.at(-1).content;

const responseMediator = await agentMediator.invoke({
    messages: [new HumanMessage(`
        Domanda dell'utente:
        ${question}

        Riposta Psycho:
        ${responsePsychoText}

        Riposta Psy:
        ${responsePsyText}

        Fai in recap della discussione e dimmi il risultato finale della domanda
        `)]
});

console.log(responseMediator.messages.at(-1).content);
