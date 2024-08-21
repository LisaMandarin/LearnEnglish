import OpenAI from "openai";

export async function openAIResult (termChinese, termEnglish, termExample, selectedText, lookupTerms, setNotesLoading, setNotesError, setNotes) {
    const displayResult = async (word, lookupTerms) => {
        const openai = new OpenAI({
            apiKey: import.meta.env.VITE_OPENAI_API_KEY,
            dangerouslyAllowBrowser: true
        })
        const instructions = `You are an English-Chinese(traditional) dictionary for English learners.  Word: ${word}.  Tell me the word's information of ${lookupTerms.join(',')} and its part of speech`
        const functionParameters = {
            type: 'object',
            properties: {
                word: { type: 'string', description: 'The word being defined' },
                partOfSpeech: { type: 'string', description: 'The part of speech of the word'},
            },
            required: ['word', 'partOfSpeech']
        }

        if (lookupTerms.includes(termChinese)) {
            functionParameters.properties.chineseDefinition = { type: 'string', definition: 'The definition in traditional Chinese'}
            functionParameters.required.push('chineseDefinition')
        }

        if (lookupTerms.includes(termEnglish)) {
            functionParameters.properties.englishDefinition = { type: 'string', definition: 'The definition in English'}
            functionParameters.required.push('englishDefinition')
        }

        if (lookupTerms.includes(termExample)) {
            functionParameters.properties.exampleSentence = { type: 'string', definition: 'An example sentence using the word'}
            functionParameters.required.push('exampleSentence')
        }

        const completion = await openai.chat.completions.create({
            messages: [
            {role: "user", content: instructions},
            ],
            functions: [{
                name: "format_response",
                description: "Formats the response into word details",
                parameters: functionParameters
            }],
            function_call: {name: "format_response"},
            model: "gpt-3.5-turbo",
            temperature: 1.5,
            max_tokens: 250
        })

        const response = completion.choices[0].message.function_call.arguments
        try {
            const parsedResponse = JSON.parse(response)
            const { word: responseWord, partOfSpeech, chineseDefinition, englishDefinition, exampleSentence } = parsedResponse
            const formattedResponse = `${responseWord} (${partOfSpeech})\n`+
                (chineseDefinition ? `・${chineseDefinition}\n`: '')+
                (englishDefinition ? `・${englishDefinition}\n`: '')+
                (exampleSentence ? `・${exampleSentence}\n`: '')
            return formattedResponse   
        } catch (error) {
            console.error('Error parsing JSON response: ', error, response)
            throw new Error('Failed to parse response from OpenAI')
        }
    }
    const noteId = crypto.randomUUID()
    try {
        setNotesLoading(true)
        setNotes(current => [...current, {id: noteId, wordInfo: "Loading"}])

        const result = await displayResult(selectedText, lookupTerms)
        setNotesError(null)
        setNotes(current => 
            current.map(note => note.id === noteId ? {id: noteId, wordInfo: result} : note)
        )
        return true
    } catch (error) {
        setNotesLoading(false)
        setNotesError(error.message)
        setNotes(current => 
            current.map(note => note.id === noteId ? {id: noteId, wordInfo: error.message} : note)
        )
        return false
    } finally {
        setNotesLoading(false)
    }
}