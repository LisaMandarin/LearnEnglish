import React, { useState, createContext } from 'react'

export const AppContext = createContext()

export const AppProvider = ({children}) => {
    const [ article, setArticle ] = useState('')
    const [ sentences, setSentences ] = useState(['']) 
    const [ translation, setTranslation ] = useState([])
    // const [ notes, setNotes ] = useState([])
    const [ notes, setNotes ] = useState([
        {id: 111, wordInfo: 'Lifeguards work at beaches and pools.'},
        {id: 222, wordInfo: 'They help us stay safe in the water.'},
        {id: 333, wordInfo: 'Hot weather makes you sweat. Your body is releasing water to keep you cool.'},
        {id: 444, wordInfo: 'You need more water to stay healthy. Drink plenty of it, even when you are not thirsty.'}
        ])

    const [ translationError, setTranslationError ] = useState(null)
    const [ translationLoading, setTranslationLoading ] = useState(false)
    const [ notesError, setNotesError ] = useState(null)
    const [ notesLoading, setNotesLoading ] = useState(false)
    const [ darkMode, setDarkMode ] = useState(true) 

    return (
        <AppContext.Provider 
            value={{article, setArticle,
                    sentences, setSentences,
                    translation, setTranslation,
                    notes, setNotes,
                    translationError, setTranslationError,
                    translationLoading, setTranslationLoading,
                    notesError, setNotesError,
                    notesLoading, setNotesLoading,
                    darkMode, setDarkMode
            }}>
                {children}
        </AppContext.Provider>
    )
}