import { useEffect, useState } from "react";

export function BreakSentence({ divRef, nextDivRef }) {
    const [ originalText, setOriginalText ] = useState('')
    const [ sentences, setSentences ] = useState([])

    useEffect(() => {
        if (divRef.current) {
            setOriginalText(divRef.current.innerText)
        }
    }, [divRef])
    
    useEffect(() => {
        const regex = /[^.!?]+[.!?]+/g    // not start with .!? but end with .!?
        if (originalText) {
            const matchedSentences = originalText.match(regex)
            if (matchedSentences) {
                setSentences(matchedSentences) 
            }
        }
    }, [originalText])

    useEffect(() => {
        if (nextDivRef.current && sentences.length > 0) {
            nextDivRef.current.innerHTML = sentences
                .map(sentence => `➢${sentence.trim()}`)
                .join('<br />')
        }
    }, [nextDivRef, sentences])

    return null 
}