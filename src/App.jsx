import { Header } from "./Header"
import { Section } from "./Section"
import './App.css'

export default function App() {
  return (
    <body>
      <Header />
      <Section 
        title="輸入文字"
        idName='original' 
        button1="清除原文"
        button2="陳列句子" />
      <Section 
        title="陳列句子"
        idName='list' 
        button1="清除句子"
        button2="翻譯" />
      <Section 
        title="翻譯"
        idName='translation' 
        button1="清除"
        button2="查單詞" />
      <Section 
        title="筆記"
        idName='notes' 
        button1="清除"
        button2="筆記生成" />
    </body>
  )
}