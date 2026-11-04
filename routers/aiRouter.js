import { Router } from "express";
import genericAgent from "../agents/generic.js";
import { HumanMessage } from "langchain";

const router = Router();


// http://localhost:3000/ai
router.get('/', async (req, res) => {
    const richiesta = req.query.request

    const response = await genericAgent.invoke({
        messages: [new HumanMessage(richiesta)]
    });

    const responseText = response.messages.at(-1).content

    res.send(`Stai chiedendo: ${richiesta}`)
});


// http://localhost:3000/ai/chat
// Corpo della richiesta:
// { "message": "Ciao come stai" }
router.post('/chat', async (req, res) => {

    const datiIngresso = req.body;
    const messaggioInIngresso = datiIngresso.message;

    const messageFull = `
    Questa la richiesta che ti è stata fatta:
    ${messaggioInIngresso}

    Rispondi in maniera testuale, evita Markdown.
    `
    const response = await genericAgent.invoke({
        messages: [new HumanMessage(messageFull)]
    });

    const responseText = response.messages.at(-1).content;

    res.json({
        risposta: responseText
    });
})

export default router;