import { Icon } from "@iconify/react"
import { Button, Input } from "antd"
import { DownloadOutlined } from "@ant-design/icons"
import HintJSON from '../data/hint.json'
import { useState } from "react"
import { GeneratePDF } from "./GeneratePDF"

export function NotesSection({notes, setNotes, loading, error, sentences, translation, darkMode, setError}) {
    const [ showHint, setShowHint ] = useState(false)
    const { TextArea } = Input

    const clearNotes = () => {
        const confirmed = window.confirm('確定清除全部筆記？')
        if (confirmed) {
            setNotes([])
            setError(null)
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
                    {HintJSON['notes'].map((hint, index) => (
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
                            <button className={ darkMode ? 'close-button dark-mode' : 'close-button'} onClick={() => deleteNote(n.id)}>X</button>
                            <TextArea 
                                className={ darkMode ? 'dark-mode' : ''}
                                value={n.wordInfo} 
                                onChange={e => handleTextareaChange(e.target.value, n.id)}
                                autoSize
                                style={{backgroundColor: "inherit"}} 
                            />
                        </div>    
                    ))
                ) : (
                    <TextArea 
                        className= { darkMode ? 'dark-mode sample' : 'sample'} 
                        placeholder='筆記'
                        autoSize
                        style={{backgroundColor: "inherit"}}
                     />
                )}
                
            </div>         
            <div>
                <Button onClick={clearNotes}>清除全部筆記</Button>
                <Button 
                    type="primary" 
                    icon={<DownloadOutlined />}
                    iconPosition="end"
                    onClick={() => GeneratePDF(sentences, translation, notes)}>
                        PDF生成
                </Button>
            </div>
        </section>
    )
}