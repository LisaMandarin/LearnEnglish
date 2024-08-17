import { useEffect } from "react"

export function useLookupTerms({setLookupTerms, english, chinese, example, termChinese, termEnglish, termExample}) {
    useEffect(() => {
        setLookupTerms(current => {
        const newTerms = new Set(current)
        if (english) newTerms.add(termEnglish)
        else newTerms.delete(termEnglish)
        
        if (chinese) newTerms.add(termChinese)
        else newTerms.delete(termChinese)
        
        if (example) newTerms.add(termExample)
        else newTerms.delete(termExample)

        return Array.from(newTerms)
        })
    }, [english, chinese, example, setLookupTerms, termChinese, termEnglish, termExample])
}