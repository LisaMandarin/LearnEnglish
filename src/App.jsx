import { useEffect, useState } from 'react'
import './App.css'
import { ArticleSection } from './components/ArticleSection'
import { SentencesSection } from './components/SentencesSection'

export default function App() {
  const [ article, setArticle ] = useState('')
  const [ sentences, setSentences ] = useState([]) 

  return (
    <div>
      <header>
        <h1>句句通</h1>
        <p>把英文文章分句翻譯，也可以查詢單詞意思，最後把翻譯和查詢的資料編輯後炇成pdf檔儲存。</p>
        <p>👉🏻👉🏻請按照以下的步驟1→2→3→4完成你的筆記</p>
      </header>
      <main>
        <ArticleSection 
          article={article} 
          setArticle={setArticle}
          setSentences={setSentences} />
        <SentencesSection
          sentences={sentences} 
          setSentences={setSentences} />
      </main>
    </div>
  )
}