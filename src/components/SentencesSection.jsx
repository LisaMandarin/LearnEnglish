import { Icon} from '@iconify/react'
import { Button } from 'antd'
import HintJSON from '../data/hint.json'
import { microsoftTranslator } from './APIs/microsoft-translator'
import { useState } from 'react'

export function SentencesSection({sentences, setSentences, setTranslation, setLoading, setError, darkMode}) {
    const [ showHint, setShowHint ] = useState(false)
    
    const clearSentences = () => {
        const confirmed = window.confirm('確定清除文字？')
        if (confirmed) {
            setSentences([''])
        }
    }
    
    const handleTextareaChange = (value, index) => {
        const newSentences = [...sentences]
        if (value.trim() === '' && sentences.length > 1) {
            newSentences.splice(index, 1)  // remove empty string during onChange
        } else {
            newSentences[index] = value
        }
        setSentences(newSentences)
    }

    const ProcessSentences = () => {
        microsoftTranslator(sentences, setSentences, setLoading, setError, setTranslation)
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
            {showHint && (
                <ul>
                    {HintJSON['sentences'].map((hint, index) => (
                        <li key={index}>{hint}</li>
                    ))}
                </ul>
            )}
            <ul className='renderingWindow'>
                { sentences.map((s, index) => (
                        <li key={index}>
                            <textarea 
                                className={ darkMode ? 'dark-mode' : ''}
                                placeholder='句子'
                                value={`${s}`} 
                                onChange={e => handleTextareaChange(e.target.value, index)}
                                style={{fontSize: '1rem'}}/>
                        </li>
                    ))}
            </ul>
            <div>
                <Button onClick={clearSentences}>清除文字</Button>
                <Button type='primary' onClick={ProcessSentences}>翻譯</Button>
            </div>
        </section>
    )
}
