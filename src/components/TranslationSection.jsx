import { Icon} from '@iconify/react'
import HintJSON from '../data/hint.json'
import { openAIResult } from './APIs/openai'
import { useEffect, useState } from 'react'


export function TranslationSection({translation, setTranslation, sentences, error, loading, setNotes, translationAreaRef}) {
    const [ showHint, setShowHint ] = useState(false)
    const [ chinese, setChinese ] = useState(false)
    const [ english, setEnglish ] = useState(false)
    const [ example, setExample ] = useState(false)
    const [ lookupTerms, setLookupTerms ] = useState([])
    const termChinese = 'traditional Chinese definition'
    const termEnglish = 'English definition'
    const termExample = 'an example sentence'
    

    const clearTranslation = () => setTranslation([])
    
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
        openAIResult(termChinese, termEnglish, termExample, selectedText, lookupTerms, setNotes)
    }

    useEffect(() => console.log('lookupTerms: ', lookupTerms), [lookupTerms])
   
    return (
        <section id='translation-section'>
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
            <ul className='renderingWindow'>
                {translation.length === 0
                    ? (<><span className='sample'>➢原句</span><br /><span className='sample'>&nbsp;&nbsp;&nbsp;翻譯</span></>
                    )
                    : sentences.map((s, index) => (
                        <li key={index} className='original-text'>{s}
                            <span className='translation-text'>{translation[index]}</span>
                        </li>
                    ))
                }
            </ul>
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