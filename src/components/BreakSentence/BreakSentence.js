export function BreakSentence(divRef1, divRef2) {
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
    
    
    
    // const [ renderedText, setRenderedText ] = useState([])

    // // retrieve text from original area and trim it into items
    // useEffect(() => {
    //     if (divRef1.current) {
    //         const originalText = divRef1.current.innerText
    //         const regex = /[^.!?]+[.!?]+/g  // not start with .!? but end with .!?
    //         setRenderedText(originalText.match(regex))
    //     }
    // }, [divRef1])

    // useEffect(() => {
    //     if (divRef2.current) {
    //         divRef2.current.innerHTML = renderedText
    //                                         .map(text => `➢${text}`)
    //                                         .join('<br />')
    //     }
    // }, [renderedText, divRef2])

}