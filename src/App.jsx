import { Switch } from 'antd'
import { useEffect, useRef, useState } from 'react'
import './App.css'
import { ArticleSection } from './components/ArticleSection'
import { SentencesSection } from './components/SentencesSection'
import { TranslationSection } from './components/TranslationSection'
import { NotesSection } from './components/NotesSection'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'

export default function App() {
  const [ article, setArticle ] = useState('')
  const [ sentences, setSentences ] = useState(['']) 
  const [ translation, setTranslation ] = useState([])
  const [ notes, setNotes ] = useState([])

  const [ translationError, setTranslationError ] = useState(null)
  const [ translationLoading, setTranslationLoading ] = useState(false)
  const [ notesError, setNotesError ] = useState(null)
  const [ notesLoading, setNotesLoading ] = useState(false)
  const [ darkMode, setDarkMode ] = useState(true) 

  const onChange = checked => {
    setDarkMode(checked)
  }

  return (
    <div className={ darkMode ? 'dark-mode' : ''}>
      <header>
        <div className='switch'>
          <SunOutlined /><Switch defaultChecked onChange={onChange}/><MoonOutlined />
        </div>
        <h1>句句通</h1>
        <p>把英文文章分句翻譯，也可以查詢單詞意思，最後把翻譯和查詢的資料編輯後炇成pdf檔儲存。</p>
        <p>👉🏻👉🏻請按照以下的步驟1→2→3→4完成你的筆記</p>
      </header>
      <main>
        <ArticleSection 
          article={article} 
          setArticle={setArticle}
          setSentences={setSentences}
          darkMode={darkMode} />
        <SentencesSection
          sentences={sentences} 
          setSentences={setSentences} 
          setTranslation={setTranslation}
          setLoading={setTranslationLoading}
          setError={setTranslationError}
          darkMode={darkMode} />
        <TranslationSection
          sentences={sentences}
          translation={translation}
          setTranslation={setTranslation}
          error={translationError}
          loading={translationLoading}
          setNotes={setNotes}
          setLoading={setNotesLoading}
          setError={setNotesError}
          setSelfError={setTranslationError} />
        <NotesSection 
          notes={notes} 
          setNotes={setNotes}
          loading={notesLoading}
          error={notesError}
          sentences={sentences}
          translation={translation}
          darkMode={darkMode}
          setError={setNotesError} />
      </main>
    </div>
  )
}