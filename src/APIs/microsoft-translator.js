// ----- Fetch Microsoft-translator API -----
export function microsoftTranslator(sentences, setSentences, setLoading, setError, setTranslation, nextStep) {
    const apiKey = import.meta.env.VITE_MICROSOFT_API_KEY

    if (sentences.length === 0) {
        alert('沒有句子可以翻譯，請先回到第一步輸入英文文章後按「陳列句子」。')
        return
    }
    setLoading(true)
    setError(null)
    setTranslation([])
    
    
    const newSentences = sentences.map(s => s.split('\n')).flat()
    
    const controller = new AbortController()
    const url = 'https://microsoft-translator-text-api3.p.rapidapi.com/translate?to=zh-Hant&from=en&textType=plain';
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': apiKey,
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
    nextStep()
    return () => controller.abort()

}
