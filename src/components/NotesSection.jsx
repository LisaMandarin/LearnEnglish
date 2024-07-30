import { Icon } from "@iconify/react"
import HintJSON from '../data/hint.json'
import { useEffect, useState } from "react"

export function NotesSection({notes, setNotes}) {
    const [ showHint, setShowHint ] = useState(false)

    const clearNotes = () => {
        const confirmed = window.confirm('確定清除全部筆記？')
        if (confirmed) {
            setNotes([])
        }
    }

    const handleTextareaChange = (value, index) => {
        const newNotes = [...notes]
        newNotes[index] = value
        setNotes(newNotes)
    }

    return (
        <section id="notes-section">
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
            <div className="renderingWindow">
                { notes.length === 0
                ? <textarea placeholder='筆記'/>
                : notes.map((n) => (
                    <textarea key={n.id} value={n.wordInfo} onChange={e => handleTextareaChange(e.target.value, n.id)} />
                )) 
                }
                
            </div>         
            <div>
                <button onClick={clearNotes}>清除筆記</button>
                <button>PDF生成</button>
            </div>
        </section>
    )
}