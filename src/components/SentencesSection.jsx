import { Icon} from '@iconify/react'
import HintJSON from '../data/hint.json'
import { useEffect, useRef, useState } from 'react'

export function SentencesSection({sentences, setSentences}) {
    const [ showHint, setShowHint ] = useState(false)
    const textAreaRef = useRef(null)
    const clearSentences = () => {
        textAreaRef.current.innerHTML = ''
        setSentences([])
    }
    
    const ProcessSentences = () => {
        const listItems = textAreaRef.current.querySelectorAll('li')
        const updatedSentences = Array.from(listItems).map(list => list.innerText.trim())
        console.log('updatedSentences: ', updatedSentences)
        setSentences(updatedSentences)

    }
    // render and re-render textarea
    useEffect(() => {
        const textArea = textAreaRef.current
        if (!textArea) return
        if (sentences.length > 0) {
            textArea.innerHTML = sentences.map(sentence => `<li>${sentence}</li>`).join('')
        } else {
            textArea.innerHTML = '<span>➣範例句</span>'
        }

    }, [sentences])

    useEffect(() => console.log('Sentences: ', sentences), [sentences])
    
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
                <ul contentEditable='true' ref={textAreaRef}></ul>
            </div>
            <div>
                <button onClick={clearSentences}>清除文字</button>
                <button onClick={ProcessSentences}>翻譯</button>
            </div>
        </section>
    )
}