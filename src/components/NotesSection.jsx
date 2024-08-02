import { Icon } from "@iconify/react"
import { Button } from "antd"
import HintJSON from '../data/hint.json'
import { useState } from "react"
import { GeneratePDF } from "./GeneratePDF"

export function NotesSection({notes, setNotes, loading, error, sentences, translation, darkMode}) {
    const [ showHint, setShowHint ] = useState(false)

    const clearNotes = () => {
        const confirmed = window.confirm('確定清除全部筆記？')
        if (confirmed) {
            setNotes([])
        }
    }

    const handleTextareaChange = (value, id) => {
        const newNotes = notes.map(n => {
            if (n.id === id) {
                return { ...n, wordInfo: value}
            }
            return n
        })
        setNotes(newNotes)
    }

    const deleteNote = (id) => {
        const newNotes = notes.filter(n => n.id !== id)
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
                        <div key={n.id} className="note-container">
                            <button className="close-button" onClick={() => deleteNote(n.id)}>X</button>
                            <textarea 
                                className={ darkMode ? 'dark-mode' : ''}
                                value={n.wordInfo} 
                                onChange={e => handleTextareaChange(e.target.value, n.id)} 
                            />
                        </div>    
                    ))
                ) : (
                    <textarea className= { darkMode ? 'dark-mode sample' : 'sample'} value='筆記' />
                )}
                
            </div>         
            <div>
                <Button onClick={clearNotes}>清除全部筆記</Button>
                <Button type="primary" onClick={() => GeneratePDF(sentences, translation, notes)}>PDF生成</Button>
            </div>
        </section>
    )
}