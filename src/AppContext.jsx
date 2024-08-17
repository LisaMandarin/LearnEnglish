import React, { useState, createContext } from 'react'

export const AppContext = createContext()

export const AppProvider = ({children}) => {
    const [ article, setArticle ] = useState('')
    const [ sentences, setSentences ] = useState([]) 
    const [ translation, setTranslation ] = useState([])
    const [ notes, setNotes ] = useState([])
   

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