import { Icon} from '@iconify/react'
import HintJSON from '../data/hint.json'
import { useEffect, useRef, useState } from 'react'

export function TranslationSection({translation, setTranslation, sentences}) {
    const [ showHint, setShowHint ] = useState(false)
    const textAreaRef = useRef(null)
    const clearTranslation = () => {
        textAreaRef.current.innerHTML = ''
        setTranslation([])
    }
    const Lookup = () => {
       
    }

    // render and re-render textarea
    useEffect(() => {
        const textArea = textAreaRef.current
        if (!textArea) return
        if (translation.length === 0) {
            textArea.innerHTML = `<li class='sample'>原句<br>翻譯</li>`
        } else {
            textArea.innerHTML = sentences.map((s, index) => `
            <div>
                <span class='original-text'>${s}</span>
                <br>
                <span class='translation-text'>${translation[index]}</span>}
            </div>
            `).join('')
        }
    }, [sentences, translation])

    return (
        <section>
            <div>
                <h2>3. 翻譯</h2>
                <Icon icon="heroicons-outline:question-mark-circle" 
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
            </div>
        </section>
    )
}