import { config } from 'dotenv'
config()

import { Configuration, OpenAIApi } from 'openai'

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.API_KEY
}))

const instructions = `You are a dictionary for ESL learners.  Word: ${word}.  Tell me the word's information of ${lookupTerms.join(',')} and its part of speech`
const completion = await openai.chat.completions.create({
    messages: [{role: "user", content: instructions},],
    functions: [{
        name: "format_response",
        description: "Formats the response into word details",
        parameters: {
            type: "object", 
            properties: {
                word: {type: "string", description: "The word being defined"},
                partOfSpeech: {type: "string", description: "The part of speech of the word"},
                chineseDefinition: {type: "string", description: "The definition in traditional Chinese"},
                englishDefinition: {type: "string", description: "The definition in English"},
                exampleSentence: {type: "string", description: "An example sentence using the word"}
            },
            required: ["word", "partOfSpeech", "chineseDefinition", "englishDefinition", "exampleSentence"]
        }
    }],
    function_call: {name: "format_response"},
    model: "gpt-3.5-turbo",
    temperature: 1.5,
    max_tokens: 100
})
const response = JSON.parse(completion.choices[0].message.function_call.arguments)
const { word: responseWord, partOfSpeech, chineseDefinition, englishDefinition, exampleSentence } = response
const formattedResponse = `${responseWord} (${partOfSpeech})\n∙${chineseDefinition}\n∙${englishDefinition}\n∙${exampleSentence}\n`

        try {
            const result = await displayResult(selectedText, lookupTerms)
            console.log(result)
        } catch (error) {
            console.error('Fetch Failure: ', error)
        }
    }