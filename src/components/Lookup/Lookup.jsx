import { forwardRef, useEffect, useImperativeHandle } from "react"
import OpenAI from "openai"

const apiKey = import.meta.env.VITE_OPENAI_API_KEY

export const Lookup = forwardRef(({nextDivRef, isAnyCheckboxChecked}, ref) => {
    useImperativeHandle(ref, () => ({
        async handleLookup() {
            const selectedText = document.getSelection().toString().trim()
            
            if (!isAnyCheckboxChecked) {
                alert('請勾選「中文」、「English」、或「例句」')
                return
            }

            if (selectedText.length === 0) {
                alert('請先選取字再查單詞')
                return
            } 
            await displayResult(selectedText)
        } 
    }))

    const openai = new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true
    })
    const displayResult = async(word) => {
        const instructions = `Word: ${word}.  Tell me the word's part of speech in the format of (part of speech) and its definition in traditional Chinese and English. Provide an example as well.`
        const completion = await openai.chat.completions.create({
            messages: [
                {role: "user", content: `You are a helpful ESL language teacher. ${instructions}`},
            ],
            functions: [{
                name: "format_response",
                description: "Formats the response into wored details",
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
        const response = (completion.choices[0].message.function_call.arguments)
        const { word: responseWord, partOfSpeech, chineseDefinition, englishDefinition, exampleSentence } = JSON.parse(response)
        const formattedResponse = `${responseWord} (${partOfSpeech})\n∙${chineseDefinition}\n∙${englishDefinition}\n∙${exampleSentence}\n`

        if (nextDivRef && nextDivRef.current) {
            const resultDiv = document.createElement('div')
            resultDiv.innerText = formattedResponse
            nextDivRef.current.appendChild(resultDiv)
        }
    }
    return null
})
Lookup.displayName = 'Lookup'