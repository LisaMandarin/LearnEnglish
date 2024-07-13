import { useEffect, useRef, useState } from "react"
import { createRoot } from "react-dom/client"

export function Translate({divRef, nextDivRef}) {
    const [ text, setText ] = useState('')  // original section (one string)
    const [ sentences, setSentences ] = useState([])  // matched sentences (strings in array)
    const [ data, setData ] = useState(["111","222"])
    const [ error, setError ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const rootRef = useRef(null)
    

    // retrieve text from divRef
    useEffect(() => {
        if (divRef.current) {
            setText(divRef.current.innerText)
        }
    }, [divRef])

    // turn text(string) into elements in an array
    useEffect(() => {
        if (text) {
            const sentences = text
                .split('.')
                .map(t => t.trim())
                .filter(t => t !== '')
            setSentences(sentences)
        }
    }, [text])
    
    // fetch API
    useEffect(() => {
        if (sentences.length === 0) return
        setLoading(true)
        setError(null)
        const controller = new AbortController()
        const url = 'https://microsoft-translator-text-api3.p.rapidapi.com/translate?to=zh-Hant&from=en&textType=plain';
        const options = {
            method: 'POST',
            headers: {
              'x-rapidapi-key': '96feed9183msh49658918a216289p163110jsn5de6fd8ffbe9',
              'x-rapidapi-host': 'microsoft-translator-text-api3.p.rapidapi.com',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(sentences.map(sentence => ({text: sentence})))
        }
        fetch(url, options, { signal: controller.signal})
            .then(res => res.json())
            .then(results => {
                console.log('results', results)
                const translations = results.map(result => result.translations[0].text)
                setData(translations)})
            .catch(e => {
                if (e?.name === "AbortError") return
                setError(e)
            })
            .finally(() => setLoading(false))

            return () => {
                controller.abort()
            }
    }, [sentences])

    let content
    if (loading) {
        content = <span>Loading...</span>
    } else if (error != null) {
        content = <span>Error! {error.message}</span>
    } else {
        content = (
            <>
                {sentences.map((sentence, index) => (
                    <div key={index}>
                        <span className="original-text">{sentence}</span>
                        <br />
                        {data[index] && <span className="translated-text">{data[index]}</span>}
                    </div>
                ))}
            </>
        )
    }

    useEffect(() => {
        if (nextDivRef.current && !rootRef.current) {
            rootRef.current = createRoot(nextDivRef.current)
        }
        if (rootRef.current) {
            rootRef.current.render(content)
        }
    }, [nextDivRef, content])
    
    return null
}