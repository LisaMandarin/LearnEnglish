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
    const [ darkMode, setDarkMode ] = useState(false) 

    const [chinese, setChinese] = useState(true);
    const [english, setEnglish] = useState(true);
    const [example, setExample] = useState(true);
    const [lookupTerms, setLookupTerms] = useState([]);
    const termChinese = "traditional Chinese definition";
    const termEnglish = "English definition";
    const termExample = "an example sentence";
    const [selectedText, setSelectedText] = useState("");

    const [ stepCurrent, setStepCurrent ] = useState(0);
    const nextStep = () => {setStepCurrent(stepCurrent + 1)};
    const prevStep = () => {setStepCurrent(stepCurrent - 1)};
    const resetApp = () => {
        setArticle('');
        setSentences([]);
        setTranslation([]);
        setNotes([]);
        setTranslationError(null);
        setNotesError(null);
        setStepCurrent(0);
    }

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
                    darkMode, setDarkMode,
                    chinese, setChinese,
                    english, setEnglish,
                    example, setExample,
                    lookupTerms, setLookupTerms,
                    termChinese, termEnglish, termExample,
                    selectedText, setSelectedText,
                    stepCurrent, setStepCurrent,
                    nextStep, prevStep,
                    resetApp
            }}>
                {children}
        </AppContext.Provider>
    )
}