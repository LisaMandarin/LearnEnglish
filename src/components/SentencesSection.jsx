import { Icon} from '@iconify/react'
import HintJSON from '../data/hint.json'
import { useEffect, useRef, useState } from 'react'

export function SentencesSection({sentences, setSentences, setTranslation}) {
    const [ showHint, setShowHint ] = useState(false)
    const textAreaRef = useRef(null)
    const [ error, setError ] = useState(null)
    const [ loading, setLoading ] = useState(false)

    const clearSentences = () => {
        textAreaRef.current.innerHTML = ''
        setSentences([])
    }
    
    const ProcessSentences = () => {
        const listItems = textAreaRef.current.querySelectorAll('li')
        const updatedSentences = Array.from(listItems).map(list => list.innerText.trim())
        console.log('updatedSentence: ', updatedSentences)
        setSentences(updatedSentences)
        
        // Fetch API
        if (sentences.length === 0) return
        setLoading(true)
        setError(null)
        const controller = new AbortController()
        const url = 'https://microsoft-translator-text-api3.p.rapidapi.com/translate?to=zh-Hant&from=en&textType=plain';
        const options = {
            method: 'POST',
            headers: {
                'x-rapidapi-key': '96feed9183msh49658918a216289p163110jsn5de6fd8ffbe9',
                'x-rapidapi-host': 'microsoft-translator-text-api3.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sentences.map(sentence => ({text: sentence})))
        };
        fetch(url, options, {signal: controller.signal})
            .then(res=> res.json())
            .then(results => {
                const translations = results.map(result => result.translations[0].text)
                setTranslation(translations)
            })
            .catch(e => {
                if (e?.name === "AbortError") return
                setError(e)
                setTranslation(`Error!! ${e.message}`)
            })
            .finally(() => setLoading(false))

            return () => {
                controller.abort()
            }
    }

    // render and re-render textarea
    useEffect(() => {
        const textArea = textAreaRef.current
        if (!textArea) return
        if (sentences.length > 0) {
            textArea.innerHTML = sentences.map(sentence => `<li>${sentence}</li>`).join('')
        } else {
            textArea.innerHTML = "<li class='sample'>範例句</li>"
        }

    }, [sentences])

    useEffect(() => {
        if (loading) {
            setTranslation('Loading...')
        }
    }, [setTranslation, loading])
    
    return (
        <section>
            <div>
                <h2>2. 陳列句子</h2>
                <Icon icon="heroicons-outline:question-mark-circle" 
                  style={{color: '#207BFF', fontSize: '2rem', marginLeft: '5px'}}
                  onClick={() => setShowHint(current => !current)}
                />
            </div>

            <ul>
                { showHint && HintJSON['sentences'].map((hint, index) => (
                    <li key={index}>{hint}</li>
                ))}                 
            </ul>
            <div className='textArea'>
                <ul contentEditable='true' ref={textAreaRef} />
            </div>
            <div>
                <button onClick={clearSentences}>清除文字</button>
                <button onClick={ProcessSentences}>翻譯</button>
            </div>
        </section>
    )
}