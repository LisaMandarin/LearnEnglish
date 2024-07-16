import { useEffect, useState } from "react"

export function Lookup({divRef, nextDivRef}) {
    const [ selection, setSelection ] = useState('')
    
    useEffect(() => {
        const handleMouseUp = () => {
            const selectedText = document.getSelection().toString().trim()
            setSelection(selectedText)
        }
        document.addEventListener('mouseup', handleMouseUp)

        return () => {
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [])

    useEffect(() => {
        if (selection.length === 0) {
            alert ('請先選取字再查單詞')
        }
    }, [selection])
    return null
}