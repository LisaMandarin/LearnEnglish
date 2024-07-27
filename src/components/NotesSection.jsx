import { Icon } from "@iconify/react"
import HintJSON from '../data/hint.json'
import { useRef, useState } from "react"


export function NotesSection() {
    const [ showHint, setShowHint ] = useState(false)
    const textAreaRef = useRef(null)
    const clearNotes = () => {

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
                <ul contentEditable='true' ref={textAreaRef} />
            </div>
            <div>
                <button onClick={clearNotes}>清除筆記</button>
                <button onClick={GeneratePDF}>PDF生成</button>
            </div>
        </section>
    )
}