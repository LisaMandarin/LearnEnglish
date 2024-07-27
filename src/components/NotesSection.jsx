import { Icon } from "@iconify/react"
import HintJSON from '../data/hint.json'
import { useEffect, useRef, useState } from "react"
import jsPDF from "jspdf"
import { NotoSansTC } from "./NotoSansTC-VariableFont_wght-normal"



export function NotesSection({notes, setNotes, translationAreaRef}) {
    const [ showHint, setShowHint ] = useState(false)
    const textAreaRef = useRef(null)
    
    useEffect(() => {
        textAreaRef.current.innerHTML += `<div>${notes}</div>`
    }, [textAreaRef, notes])

    // set the initial text for Notes section
    useEffect(() => {
        if (notes.length === 0) {
            textAreaRef.current.innerHTML = `<div class="sample">筆記</div>`
        }
    }, [notes, textAreaRef])

    const clearNotes = () => {
        textAreaRef.current.innerHTML = ''
        setNotes('')
    }
    const GeneratePDF = () => {
        // ----- basic pdf setting -----
        const pdf = new jsPDF({lineHeight: 1})  // default unit: mm
        pdf.addFileToVFS('NotoSansTC-VariableFont_wght-normal.ttf', NotoSansTC)
        pdf.addFont('NotoSansTC-VariableFont_wght-normal.ttf', 'NotoSansTC', 'normal')
        pdf.setFont('NotoSansTC')

        const pageWidth = pdf.internal.pageSize.width;
        const pageHeight = pdf.internal.pageSize.height;
        const margins = {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
        }
        const maxWidth = pageWidth - (margins.left + margins.right);
        // ----- end of basic pdf setting -----

        // ----- generate translation section -----
        const translationContent = translationAreaRef.current.innerText;
        const splitTranslation = pdf.splitTextToSize(translationContent, maxWidth)  // split text to fit within the maxWidth
        console.log('Translation: ', splitTranslation)
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
            <div 
                className="textArea" 
                id="notesArea"
                contentEditable='true' 
                ref={textAreaRef}
            />         
            <div>
                <button onClick={clearNotes}>清除筆記</button>
                <button onClick={GeneratePDF}>PDF生成</button>
            </div>
        </section>
    )
}