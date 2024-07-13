import { Header } from "./components/Header/Header"
import Section from "./components/Section/Section"
import './App.css'
import { useRef } from "react"

export default function App() {
  const originalRef = useRef(null)
  const listRef = useRef(null)
  const translationRef = useRef(null)
  const notesRef = useRef(null)

  return (
    <div>
      <Header />
      <Section 
        title='輸入文字'
        idName='original'
        button1='清除原文'
        button2='陳列句子'
        ref={originalRef}
        nextDivRef={listRef} />  
      
      <Section 
        title='陳列句子'
        idName='list' 
        button1='清除句子'
        button2='翻譯'
        ref={listRef}
        nextDivRef={translationRef} />

      <Section 
        title='翻譯'
        idName='translation' 
        button1='清除'
        button2='查單詞'
        ref={translationRef}
        nextDivRef={notesRef} />

      <Section 
        title='筆記'
        idName='notes' 
        button1='清除'
        button2='筆記生成'
        ref={notesRef}
        nextDivRef={notesRef}
        />
    </div>
  )
}