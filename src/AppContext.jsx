import { useStyleRegister } from 'antd/es/theme/internal'
import React, { useState, createContext } from 'react'

export const AppContext = createContext()

export const AppProvider = ({children}) => {
    // const [ article, setArticle ] = useState('')
    const [ sentences, setSentences ] = useState([]) 
    // const [ translation, setTranslation ] = useState([])
    // const [ notes, setNotes ] = useState([])
   
    const [ article, setArticle ] = useState("Heman Bekele whipped up the most dangerous of what he called his “potions” when he was just over 7 years old. He’d been conducting his own science experiments for about three years by that point, mixing up whatever he could get his hands on at home and waiting to see if the resulting goo would turn into anything.")
    const [ translation, setTranslation ] = useState(["赫曼·貝克萊（Heman Bekele）在剛過7歲時調製出了他所謂的“藥水”中最危險的一種。", "到那時，他已經進行了大約三年的科學實驗，混合家裡能找到的任何東西，並等待看那些結果是否會變成什麼特別的東西。"])
    const [ notes, setNotes ] = useState([
        {id: 111, wordInfo: "whipped (verb)\n・鞭打\n・be beaten\nHe whipped the horse to make it go faster."},
        {id: 222, wordInfo: "whipped (verb)\n・鞭打\n・be beaten\nHe whipped the horse to make it go faster."}
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