import { Icon} from '@iconify/react'
import HintJSON from '../data/hint.json'
import { microsoftTranslator } from './APIs/microsoft-translator'
import { useEffect, useRef, useState } from 'react'

export function SentencesSection({sentences, setSentences, setTranslation, setLoading, setError}) {
    const [ showHint, setShowHint ] = useState(false)
    
    const clearSentences = () => {
        const confirmed = window.confirm('確定清除文字？')
        if (confirmed) {
            setSentences([])
        }
    }
    
    const handleTextareaChange = (value, index) => {
        const newSentences = [...sentences]
        if (value.trim() === '') {
            newSentences.splice(index, 1)  // remove empty string during onChange
        } else {
            newSentences[index] = value
        }
        setSentences(newSentences)
    }

    const ProcessSentences = () => {
        microsoftTranslator(sentences, setLoading, setError, setTranslation)
    } 
        
        
    return (
        <section>
            <div>
                <h2>2. 陳列句子</h2>
                <Icon className='icon-questionMark' 
                    icon="heroicons-outline:question-mark-circle" 
                    style={{color: '#207BFF', fontSize: '2rem', marginLeft: '5px'}}
                    onClick={() => setShowHint(current => !current)}
                />
            </div>

            <ul>
                { showHint && HintJSON['sentences'].map((hint, index) => (
                    <li key={index}>{hint}</li>
                ))}                 
            </ul>
            <ul className='renderingWindow'>
                {sentences.length === 0
                    ? <textarea placeholder='➢句子' style={{fontSize: '1rem'}}/>                     
                    : sentences.map((s, index) => (
                        <li key={index}>
                            <textarea 
                                value={`${s}`} 
                                onChange={e => handleTextareaChange(e.target.value, index)}
                                style={{fontSize: '1rem'}}/>
                        </li>
                    ))}
            </ul>
            <div>
                <button onClick={clearSentences}>清除文字</button>
                <button onClick={ProcessSentences}>翻譯</button>
            </div>
        </section>
    )
}
