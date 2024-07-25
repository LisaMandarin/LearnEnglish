import './App.css'
import HintJSON from './data/hint.json'
import { Section } from './components/Section'

export default function App() {  
  return (
    <div>
      <header>
        <h1>句句通</h1>
        <p>把英文文章分句翻譯，也可以查詢單詞意思，最後把翻譯和查詢的資料編輯後炇成pdf檔儲存。</p>
        <p>👉🏻👉🏻請按照以下的步驟1→2→3→4完成你的筆記</p>
      </header>
      <main>
        <Section
          sectionKey='article'
          title='1. 輸入文章'
          json={HintJSON}
          placeholder='請輸入英文原文'
          buttons={
              <button>斷句</button>
          }
        />
          <Section
          sectionKey='sentences'
          title='2. 陳列句子'
          json={HintJSON}
          placeholder='➣範例句'
          buttons={
              <button>翻譯</button>
          }
        />
        <Section
          sectionKey='translation'
          title='3. 翻譯'
          json={HintJSON}
          placeholder='➣原句。翻譯句。'
          buttons={
              <>
                <button>查詢單詞</button>
                <input type='checkbox' id='chinese' name='chinese' /><label htmlFor='chinese'>中文</label>
                <input type='checkbox' id='english' name='english' /><label htmlFor='english'>英文</label>
                <input type='checkbox' id='example' name='example' /><label htmlFor='example'>例句</label>
              </>
          }
        />
        <Section
          sectionKey='notes'
          title='4. 筆記'
          json={HintJSON}
          placeholder='筆記1'
          buttons={
              <button>PDF生成</button>
          }
        />       
      </main>
    </div>
  )
}