import { Icon } from "@iconify/react"
import HintJSON from '../data/hint.json'
import { useEffect, useState } from "react"

export function NotesSection({notes, setNotes, loading, error}) {
    const [ showHint, setShowHint ] = useState(false)

    const clearNotes = () => {
        const confirmed = window.confirm('確定清除全部筆記？')
        if (confirmed) {
            setNotes([])
        }
    }

    const handleTextareaChange = (value, index) => {
        const newNotes = [...notes]
        newNotes[index].wordInfo = value
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

            {showHint && (
                <ul>
                    {HintJSON['sentences'].map((hint, index) => (
                        <li key={index}>{hint}</li>
                    ))}
                </ul>
            )}
            
            <div className="renderingWindow">
                { loading ? (
                    <span>Loading...</span>
                ) : error ? (
                    <span>{error}</span>
                ) : notes && notes.length > 0 ? (
                    notes.map(n => (
                        <textarea 
                            key={n.id} 
                            value={n.wordInfo} 
                            onChange={e => handleTextareaChange(e.target.value, n.id)} 
                        />
                    ))
                ) : (
                    <textarea className="sample" value='筆記' />
                )}
                
            </div>         
            <div>
                <button onClick={clearNotes}>清除筆記</button>
                <button>PDF生成</button>
            </div>
        </section>
    )
}