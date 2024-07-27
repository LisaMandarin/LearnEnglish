import { Icon} from '@iconify/react'
import HintJSON from '../data/hint.json'
import { useEffect, useRef, useState } from 'react'
import OpenAI from 'openai'

export function TranslationSection({translation, setTranslation, sentences, error, loading, setNotes, translationAreaRef}) {
    const [ showHint, setShowHint ] = useState(false)
    const [ chinese, setChinese ] = useState(false)
    const [ english, setEnglish ] = useState(false)
    const [ example, setExample ] = useState(false)
    const [ lookupTerms, setLookupTerms ] = useState([])
    const termChinese = 'traditional Chinese definition'
    const termEnglish = 'English definition'
    const termExample = 'an example sentence'
    const textAreaRef = useRef(null)

    const clearTranslation = () => {
        textAreaRef.current.innerHTML = ''
        setTranslation([])
    }
    
    // toggle checkboxes and save the values to lookupTerms
    useEffect(() => {
        setLookupTerms(current => {
            let newTerms = [...current]
            if (english) {
                if (!newTerms.includes(termEnglish)) {
                    newTerms.push(termEnglish)
                }
            } else {
                newTerms = newTerms.filter(t => t !== termEnglish)
            }
            if (chinese) {
                if (!newTerms.includes(termChinese)) {
                    newTerms.push(termChinese)
                }
            } else {
                newTerms = newTerms.filter(t => t !== termChinese)
            }
            if (example) {
                if (!newTerms.includes(termExample)) {
                    newTerms.push(termExample)
                }
            } else {
                newTerms = newTerms.filter(t => t !== termExample)
            }
            return newTerms
        })
    }, [chinese, english, example])

    const Lookup = async () => {
        const selectedText = document.getSelection().toString().trim()
        if (!chinese && !english && !example) {
            alert ('請勾選「中文」、「English」、或「例句」')
            return
        }
        if (!selectedText) {
            alert ('請先選取字再查單詞')
            return
        }
        // ----- fetch OPENAI API -----
        const displayResult = async (word, lookupTerms) => {
            const openai = new OpenAI({
                apiKey: import.meta.env.VITE_OPENAI_API_KEY,
                dangerouslyAllowBrowser: true
            })
            const instructions = `You are a dictionary for ESL learners.  Word: ${word}.  Tell me the word's information of ${lookupTerms.join(',')} and its part of speech`
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
                max_tokens: 100
            })
            const response = JSON.parse(completion.choices[0].message.function_call.arguments)
            const { word: responseWord, partOfSpeech, chineseDefinition, englishDefinition, exampleSentence } = response
            const formattedResponse = `${responseWord} (${partOfSpeech})<br>`+
                (chineseDefinition ? `・${chineseDefinition}<br>`: '')+
                (englishDefinition ? `・${englishDefinition}<br>`: '')+
                (exampleSentence ? `・${exampleSentence}<br>`: '')
            return formattedResponse   
        }
        try {
            const result = await displayResult(selectedText, lookupTerms)
            setNotes(result)
        } catch (error) {
            console.error('Fetch Failure: ', error)
        }
        // ----- end of fetch OPENAI API ----
    }

    useEffect(() => console.log('lookupTerms: ', lookupTerms), [lookupTerms])

    // render and re-render textarea
    useEffect(() => {
        const textArea = textAreaRef.current
        if (!textArea) return
        if (translation.length === 0) {
            textArea.innerHTML = `<li ref=${translationAreaRef} class='sample'>原句<br>&nbsp;&nbsp;&nbsp;翻譯</li>`
        } else if (loading) {
            textArea.innerText = 'Loading...'
        } else if (error) {
            textArea.innerText = `Error: ${error.message}` || 'Unknown Error!!'
        }else {
            textArea.innerHTML = sentences.map((s, index) => `
            <div>
                <span class='original-text'>➢${s}</span>
                <br>
                <span class='translation-text'>&nbsp;&nbsp;&nbsp;${translation[index]}</span>}
            </div>
            `).join('')
        }
        }, [sentences, translation, loading,error, translationAreaRef])
        

    return (
        <section>
            <div>
                <h2>3. 翻譯</h2>
                <Icon className='icon-questionMark' 
                    icon="heroicons-outline:question-mark-circle" 
                    style={{color: '#207BFF', fontSize: '2rem', marginLeft: '5px'}}
                    onClick={() => setShowHint(current => !current)}
                  />
            </div>

            <ul>
                { showHint && HintJSON['translation'].map((hint, index) => (
                    <li key={index}>{hint}</li>
                ))}                 
            </ul>
            <div className='textArea'>
                <ul contentEditable='true' ref={textAreaRef} />
            </div>
            <div>
                <button onClick={clearTranslation}>清除文字</button>
                <button onClick={Lookup}>查詢單字</button>
                <input type='checkbox' name='english' id='english' checked={english} onChange={e => setEnglish(e.target.checked)}/><label htmlFor='english'>英文解釋</label>
                <input type='checkbox' name='chinese' id='chinese' checked={chinese} onChange={e => setChinese(e.target.checked)}/><label htmlFor='chinese'>中文定義</label>
                <input type='checkbox' name='example' id='example' checked={example} onChange={e => setExample(e.target.checked)}/><label htmlFor='example'>例句</label>
            </div>
        </section>
    )
}