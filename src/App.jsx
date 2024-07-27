import { useEffect, useState } from 'react'
import './App.css'
import { ArticleSection } from './components/ArticleSection'
import { SentencesSection } from './components/SentencesSection'
import { TranslationSection } from './components/Translation'
import { NotesSection } from './components/NotesSection'

export default function App() {
  const [ article, setArticle ] = useState('')
  const [ sentences, setSentences ] = useState([]) 
  const [ translation, setTranslation ] = useState([])
  const [ notes, setNotes ] = useState('')
  const [ error, setError ] = useState(null)
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    console.log('article: ', article)
    console.log('sentences: ', sentences)
    console.log('translation: ', translation)
    console.log('notes: ', notes)
  }, [article, sentences, translation, notes])
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
          setSentences={setSentences} 
          setTranslation={setTranslation}
          setLoading={setLoading}
          setError={setError} />
        <TranslationSection
          sentences={sentences}
          translation={translation}
          setTranslation={setTranslation}
          error={error}
          loading={loading}
          setNotes={setNotes} />
        <NotesSection notes={notes} setNotes={setNotes} />
      </main>
    </div>
  )
}