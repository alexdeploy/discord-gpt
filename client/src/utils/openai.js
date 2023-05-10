/**
 * OpenAI API
 * @module openai
 * @description OpenAI API Configuration and functions.
 * @see Documentation https://beta.openai.com/docs/api-reference
 */

/**
 * INFO ABOUT OPEN AI API
 *  * Models: https://beta.openai.com/docs/api-reference/models
 *  * Endpoints: https://platform.openai.com/docs/models/model-endpoint-compatibility
 */

/* CONFIGURATION */
/********************************************************/

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const model = {
    ADA: "ada",
    BABBAGE: "",
    CURIE: "curie",
    DAVINCI: "text-davinci-003",
    GPT3_TURBO: "gpt-3.5-turbo",
    MODERATION: {
        STABLE: "text-moderation-stable",
        LATEST: "text-moderation-latest"
    }
};



const role = {
    USER: "user",
    SYSTEM: "system",
    ASSISTANT: "assistant"
}

const instruction = {
    ASSISTANT: "You are a helpful assistant.",
    BOBO: "Responde con un nivel cultural bajo y con un lenguaje informal.",
    RAYKIRE: "Responde con una actitud de superioridad y maleducado. Y ruega que no te vuelva a preguntar."
}

/********************************************************/

/**
 * CREATE COMPLETION
 * 
 * @param {*} prompt is an string sent by the user.
 * @see Documentation https://beta.openai.com/docs/api-reference/completions/create
 * @returns Response object with the completion.
 */
const createCompletion = async (prompt) => {

    try {

        const completion = await openai.createCompletion({
            model: model.GPT3_TURBO,
            prompt: prompt,
        });

        const response = completion.data.choices[0].text;

        return response;

    } catch(error) {

        // Handle errors
        const errorCode = error.response.status;

        // If error is 429 Too Many Requests, then retry after the specified time.
        if (errorCode === 429) {
            // Code
        }

        // If error is 401 Unauthorized, then the API key is invalid.
        if (errorCode === 401) {
            // Code
        }
        console.log("Error: " + errorCode + " | " + error.response.statusText);
    }
}

/**
 * CREATE CHAT COMPLETION
 *
 * @param {*} messages is an array of objects with the role and content of the message.
 * @see Documentation https://platform.openai.com/docs/api-reference/chat/create
 * @returns Response object with the chat completion.
 * 
 * TODO: Take a look at the documentation for learn about the different parameters that Create Completion accepts.
 * TODO: Investigate if the chat is able to learn from the user's messages. (Remember conversations)
 * TODO: Improve the security of the prompt. ->
 * TODO: Handle errors.
 */
const createChatCompletion = async (prompt) => {

    const messages = [
        { role: role.SYSTEM, content: instruction.ASSISTANT },
        { role: role.USER, content: prompt },
    ]

    try{

        const completion = await openai.createChatCompletion({
            model: model.GPT3_TURBO,
            messages: messages
          });

        const response = completion.data.choices[0].message;

        return response;

    } catch(error) {
        console.log(error);
    }
}

/**
 * CREATE MODERATION
 * * Classifies if text violates OpenAI's Content Policy.
 * @see Documentation https://platform.openai.com/docs/api-reference/moderations/create
 */
const createModeration = async (prompt) => {
    const response = await openai.createModeration({
        model: model.MODERATION.LATEST,
        input: prompt,
    });

    return response;
}

module.exports = {
    send: createCompletion,
    chat: createChatCompletion,
    moderation: createModeration
}