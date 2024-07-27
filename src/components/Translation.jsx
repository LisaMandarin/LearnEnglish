import { Icon} from '@iconify/react'
import HintJSON from '../data/hint.json'
import { useEffect, useRef, useState } from 'react'

export function TranslationSection({translation, setTranslation, sentences, error, loading}) {
    const [ showHint, setShowHint ] = useState(false)
    const [ chinese, setChinese ] = useState(false)
    const [ english, setEnglish ] = useState(false)
    const [ example, setExample ] = useState(false)
    const [ lookupTerms, setLookupTerms ] = useState([])
    const textAreaRef = useRef(null)
    const clearTranslation = () => {
        textAreaRef.current.innerHTML = ''
        setTranslation([])
    }
    
    useEffect(() => {
        setLookupTerms(current => {
            let newTerms = [...current]
            const termChinese = 'English definition'
            const termEnglish = 'traditional Chinese definition'
            const termExample = 'an example'

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
                <input type='checkbox' name='english' id='english' checked={english} onChange={e => setEnglish(e.target.checked)}/><label htmlFor='english'>英文解釋</label>
                <input type='checkbox' name='chinese' id='chinese' checked={chinese} onChange={e => setChinese(e.target.checked)}/><label htmlFor='chinese'>中文定義</label>
                <input type='checkbox' name='example' id='example' checked={example} onChange={e => setExample(e.target.checked)}/><label htmlFor='example'>例句</label>
            </div>
        </section>
    )
}