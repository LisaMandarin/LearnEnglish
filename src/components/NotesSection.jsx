import { Icon } from "@iconify/react"
import HintJSON from '../data/hint.json'
import { useEffect, useRef, useState } from "react"


export function NotesSection({notes, setNotes}) {
    const [ showHint, setShowHint ] = useState(false)
    const textAreaRef = useRef(null)
    
    const handleInput = e => setNotes(e.target.innerHTML)
    useEffect(() => {
        textAreaRef.current.innerHTML = notes
    })
    
    const clearNotes = () => {
        textAreaRef.current.innerHTML = ''
        setNotes('')
    }
    const GeneratePDF = () => {

    }

    return (
        <section>
            <div>
                <h2>4. 筆記</h2>
                <Icon className="icon-questionMark"
                    icon="heroicons-outline:question-mark-circle"
                    style={{color: '#207BFF', fontSize: '2rem', marginLeft: '5px'}}
                    onClick={() => setShowHint(current => !current)} />
            </div>

            <ul>
                { showHint && HintJSON['notes'].map((hint, index) => (
                    <li key={index}>{hint}</li>
                ))}
            </ul>
            <div className="textArea">
                <div 
                    contentEditable='true' 
                    ref={textAreaRef}
                    onInput={handleInput}>
                    <span className="sample">{notes}</span>
                </div>
            </div>
            <div>
                <button onClick={clearNotes}>清除筆記</button>
                <button onClick={GeneratePDF}>PDF生成</button>
            </div>
        </section>
    )
}