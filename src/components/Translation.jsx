import { Icon} from '@iconify/react'
import HintJSON from '../data/hint.json'
import { useEffect, useRef, useState } from 'react'

export function TranslationSection({translation, setTranslation, sentences, error, loading}) {
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
            textArea.innerHTML = `<li class='sample'>原句<br>&nbsp;&nbsp;&nbsp;翻譯</li>`
        } else if (loading) {
            textArea.innerText = 'Loading...'
        } else if (error) {
            textArea.innerText = `Error: ${error.message}` || 'Unknown Error!!'
        }
        
        else {
            textArea.innerHTML = sentences.map((s, index) => `
            <div>
                <span class='original-text'>➢${s}</span>
                <br>
                <span class='translation-text'>&nbsp;&nbsp;&nbsp;${translation[index]}</span>}
            </div>
            `).join('')
        }
    }, [sentences, translation, loading])

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
                <input type='checkbox' name='english' id='english' /><label htmlFor='english'>英文</label>
                <input type='checkbox' name='chinese' id='chinese' /><label htmlFor='chinese'>中文</label>
                <input type='checkbox' name='example' id='example' /><label htmlFor='example'>例句</label>
            </div>
        </section>
    )
}