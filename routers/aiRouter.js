import { Router } from "express";
import genericAgent from "../agents/generic.js";
import { HumanMessage } from "langchain";

const router = Router();


// http://localhost:3000/ai?
router.get('/', async (req, res) => {
    const richiesta = req.query.request

    const response = await genericAgent.invoke({
        messages: [new HumanMessage(richiesta)]
    });

    const responseText = response.messages.at(-1).content

    res.send(`Stai chiedendo: ${richiesta}`)
})

export default router;