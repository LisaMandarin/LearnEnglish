import { forwardRef, useEffect, useImperativeHandle } from "react"
import OpenAI from "openai"

const apiKey = import.meta.env.VITE_OPENAI_API_KEY

export const Lookup = forwardRef(({nextDivRef, isAnyCheckboxChecked}, ref) => {
    
    useImperativeHandle(ref, () => ({
        handleLookup() {
            const selectedText = document.getSelection().toString().trim()
            
            if (!isAnyCheckboxChecked) {
                alert('請勾選「中文」、「English」、或「例句」')
                return
            }

            if (selectedText.length === 0) {
                alert('請先選取字再查單詞')
                return
            } 
            displayResult()
        } 
    }))

    const openai = new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true
    })
    const displayResult = async() => {
        const completion = await openai.chat.completions.create({
            messages: [{
                role: "system", content: "You are a helpful assistant."
            }],
            model: "gpt-3.5-turbo"
        })
        console.log(completion.choices[0].message.content)
    }
    return null
})
Lookup.displayName = 'Lookup'