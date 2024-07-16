import { forwardRef, useImperativeHandle } from "react"

export const Lookup = forwardRef(({nextDivRef, isAnyCheckboxChecked}, ref) => {
    useImperativeHandle(ref, () => ({
        handleLookup() {
            const selectedText = document.getSelection().toString().trim()
            
            if (!isAnyCheckboxChecked) {
                alert('請勾選「中文」、「English」、「例句」')
                return
            }

            if (selectedText.length === 0) {
                alert('請先選取字再查單詞')
            } else if (nextDivRef.current){
                nextDivRef.current.innerHTML += `<div>${selectedText}</div>`
            }
        } 
    }))
    return null
})
Lookup.displayName = 'Lookup'