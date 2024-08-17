import { Icon } from "@iconify/react";
import { Button, Popconfirm } from "antd";
import HintJSON from "../data/hint.json";
import { openAIResult } from "./APIs/openai";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";

export function TranslationSection() {
  const {
    sentences,
    translation,
    translationLoading,
    translationError,
    setTranslation,
    setTranslationError,
    setNotesLoading,
    setNotesError,
    setNotes,
    darkMode
  } = useContext(AppContext);
  const [showHint, setShowHint] = useState(false);
  const [chinese, setChinese] = useState(true);
  const [english, setEnglish] = useState(true);
  const [example, setExample] = useState(true);
  const [lookupTerms, setLookupTerms] = useState([]);
  const [selectedText, setSelectedText] = useState('')
  const termChinese = "traditional Chinese definition";
  const termEnglish = "English definition";
  const termExample = "an example sentence";

  // clear textarea
  const clearTranslation = () => {
      setTranslation([]);
      setTranslationError(null);
  };

  // nameC = Chinese name, nameE = English name
  const Checkbox = ({nameC, nameE, checked, onChange}) => (
    <div>
      <input 
        type="checkbox"
        id={nameE}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={nameE}>{nameC}</label>
    </div>
  )

  // toggle checkboxes and save the values to lookupTerms
  useEffect(() => {
    setLookupTerms(current => {
      const newTerms = new Set(current)
      if (english) newTerms.add(termEnglish)
        else newTerms.delete(termEnglish)
      
      if (chinese) newTerms.add(termChinese)
        else newTerms.delete(termChinese)
      
      if (example) newTerms.add(termExample)
        else newTerms.delete(termExample)

      return Array.from(newTerms)
    })
  }, [english, chinese, example])

// detect select on both desktop and mobile devices
useEffect(() => {
  const handleSelectionChange = () => {
    const selection = document.getSelection()
    const text = selection ? selection.toString().trim() : ''

    setSelectedText(text)
  }

  document.addEventListener('selectionchange', handleSelectionChange)
  document.addEventListener('touchend', handleSelectionChange)

  return () => {
    document.removeEventListener('selectionchange', handleSelectionChange)
    document.removeEventListener('touchend', handleSelectionChange)
  }
}, [])

  // Look up the selected text through OpenAI
  const Lookup = async () => {
    if (!chinese && !english && !example) {
      alert("請勾選「中文」、「English」、或「例句」");
      return;
    }
    if (!selectedText) {
      alert("請先選取字再查單詞");
      return;
    }
    openAIResult(
      termChinese,
      termEnglish,
      termExample,
      selectedText,
      lookupTerms,
      setNotesLoading,
      setNotesError,
      setNotes
    );
  };

  return (
    <section id="translation-section">
      <div>
        <h2>3. 翻譯</h2>
        <Icon
          className="icon-questionMark"
          icon="heroicons-outline:question-mark-circle"
          style={{ color: "#5fa0ff", fontSize: "2rem", marginLeft: "5px" }}
          onClick={() => setShowHint((current) => !current)}
        />
      </div>

      <ul className={`hint-div ${ showHint ? "expand" : ""}`}>
        {HintJSON["translation"].map((hint, index) => (
          <li key={index}>{hint}</li>
        ))}
      </ul>

      {translation.length === 0 && translationLoading ? (
          <div 
            style={{border: "1px solid #9a9a9a", padding: "15px"}}>
            Loading...
          </div>
        ) : translation.length === 0 && translationError ? (
          <div style={{border: "1px solid #9a9a9a", padding: "15px"}}>
            {translationError}
          </div>
        ) : translation.length === 0 ? (
          <div style={{border: "1px solid #9a9a9a", padding: "15px", color: '#9a9a9a'}}>
            按「翻譯」後，原句和翻譯會呈現在這區，更多資訊請按上方「問號」。
          </div>
        ) : (
          <ol style={{border: "1px solid #9a9a9a", padding: "11px 4px 11px 42px", margin: "0"}}>
            {sentences.map((s, index) => (
              <li key={index} style={{padding: "4px 11px"}}>
                <span style={{color: darkMode ? "#F5F7FA" : "black"}}>{s}</span>
                <br />
                <span style={{color: darkMode ? "#5fa0ff" : "#b40700"}}>
                  {translation[index]}
                </span>
              </li>
            ))}
          </ol>
        )}      
      <div>
        <Popconfirm
          placement='left'
          title='碓定清除文字？'
          onConfirm={clearTranslation}
          okText='Yes'
          cancelText='No'
          >
          <Button>清除文字</Button>
        </Popconfirm>

        <Button type="primary" onClick={Lookup}>
          查詢單字
        </Button>
        <div>
          <Checkbox 
            nameC='中文定義'
            nameE='chinese'
            checked={chinese}
            onChange={e=>setChinese(e.target.checked)}
          />
          <Checkbox 
            nameC='英文解釋'
            nameE='english'
            checked={english}
            onChange={e=>setEnglish(e.target.checked)}
          />
          <Checkbox 
            nameC='例句'
            nameE='example'
            checked={example}
            onChange={e=>setExample(e.target.checked)}
          />
        </div>
      </div>
    </section>
  );
}
