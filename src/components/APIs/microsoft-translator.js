// ----- Fetch Microsoft-translator API -----
export function microsoftTranslator(sentences, setLoading, setError, setTranslation) {
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
    };
    fetch(url, options, {signal: controller.signal})
        .then(res=> res.json())
        .then(results => {
            const translations = results.map(result => result.translations[0].text)
            setTranslation(translations)
        })
        .catch(e => {
            if (e?.name === "AbortError") return
            setError(e)
            setTranslation(`Error!! ${e.message}`)
        })
        .finally(() => setLoading(false))
    
        return () => {
            controller.abort()
        }
}
