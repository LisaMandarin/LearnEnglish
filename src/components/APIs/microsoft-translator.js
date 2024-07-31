// ----- Fetch Microsoft-translator API -----
export function microsoftTranslator(sentences, setSentences, setLoading, setError, setTranslation) {
    if (sentences.length === 0) return

    setLoading(true)
    setError(null)
    
    const newSentences = sentences.map(s => s.split('\n')).flat()
    
    const controller = new AbortController()
    const url = 'https://microsoft-translator-text-api3.p.rapidapi.com/translate?to=zh-Hant&from=en&textType=plain';
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': '96feed9183msh49658918a216289p163110jsn5de6fd8ffbe9',
            'x-rapidapi-host': 'microsoft-translator-text-api3.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSentences.map(sentence => ({text: sentence})))
    };
    const fetchData = async() => {
        try {
            setSentences(newSentences)
            
            const res = await fetch(url, options, {signal: controller.signal})
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`)
            }
            const results = await res.json()
            const translations = results.map(r => r.translations[0].text)
            setTranslation(translations)
        } catch(e) {
            if (e?.name === "AbortError") return
            setError(`Error! ${e.message}`)
        } finally {
            setLoading(false)
        }
    }
    fetchData()

    return () => controller.abort()

    // fetch(url, options, {signal: controller.signal})
    //     .then(res=> {
    //         if (!res.ok) {
    //             throw new Error(`HTTP error! status: ${res.status}`)
    //         }
    //         return res.json()
    //     })
    //     .then(results => {
    //         const translations = results.map(result => result.translations[0].text)
    //         setTranslation(translations)
    //     })
    //     .catch(e => {
    //         if (e?.name === "AbortError") return
    //         setError(`Error! ${e.message}`)
    //     })
    //     .finally(() => setLoading(false))
    
    //     return () => {
    //         controller.abort()
    //     }
}
