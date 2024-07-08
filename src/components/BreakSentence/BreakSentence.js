export default function breakSentence(divRef1, divRef2) {
    if (divRef1.current) {
        const originalText = divRef1.current.innerText
        const regex = /[^.!?]+[.!?]+/g  // not start with .!? but end with .!?
        const sentences = originalText.match(regex)

        if (divRef2.current) {
            divRef2.current.innerHTML = sentences
                                            .map(text => `➢${text}`)
                                            .join('<br />')
        }
    }
}