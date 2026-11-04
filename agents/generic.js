import { createAgent } from "langchain";
import openRouterModel from '../models/openrouter.js'

const genericAgent = createAgent({
    model: openRouterModel
});

export default genericAgent;