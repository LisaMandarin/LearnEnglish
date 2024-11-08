import "./App.css";
import { ArticleSection } from "./components/ArticleSection";
import { SentencesSection } from "./components/SentencesSection";
import { TranslationSection } from "./components/TranslationSection";
import { NotesSection } from "./components/NotesSection";
import { ArticleButton } from "./components/ArticleButton";
import { SentencesButton } from "./components/SentencesButton";
import { TranslationButton } from "./components/TranslationButton";
import { NotesButton } from "./components/NotesButton";
import { useContext, useRef, useState } from "react";
import { AppContext } from "./AppContext";
import { SwitchDarkMode } from "./components/SwitchDarkMode";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Steps, theme, Tour, ConfigProvider } from "antd";


export default function App() {
  const { darkMode, stepCurrent } = useContext(AppContext);
  const textRef = useRef(null)
  const clearRef = useRef(null)
  const processRef = useRef(null)
  const [ open, setOpen ] = useState(false)

  const tourSteps = [
    {
      title: "Paste text, text length < 1000",
      description: "把要處理的文章貼在這裡，字數不可超過1000字",
      target: () => textRef.current
    },
    {
      title: "Clear text",
      description: "按這個按鈕可以清除貼上的文章",
      target: () => clearRef.current
    },
    {
      title: "Process article",
      description: "按這個按鈕可以把文章切成一句一行",
      target: () => processRef.current
    }
  ]

  const steps = [ 
    {
      title: '輸入英文文章',
      content: <ArticleSection textRef={textRef} />
    },
    {
      title: '確認分句',
      content: <SentencesSection />
    },
    {
      title: '翻譯',
      content: <TranslationSection />
    },
    {
      title: '筆記',
      content: <NotesSection />
    },
  ];

  const darkTheme = {
    algorithm: theme.darkAlgorithm
    }
  ;

  const lightTheme = {
    algorithm: theme.lightAlgorithm
    }
  ;

  const themeConfig = darkMode ? darkTheme : lightTheme

  const items = steps.map(item => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <ConfigProvider theme={themeConfig}>
      <div 
        className={darkMode ? "dark-mode" : ""}
        style={{minHeight: '100vh'}}>
        <SwitchDarkMode />
        <Header setOpen={setOpen}/>
        <Steps current={stepCurrent} items={items}/>
        <div>{steps[stepCurrent].content}</div>
        <div style={{marginTop: 24, display: 'flex', justifyContent: 'center'}}>
          {stepCurrent === 0 && <ArticleButton clearRef={clearRef} processRef={processRef}/>}
          {stepCurrent === 1 && <SentencesButton />}
          {stepCurrent === 2 && <TranslationButton />}
          {stepCurrent === 3 && <NotesButton />}        
        </div>
        <Footer />
        <Tour open={open} onClose={() => setOpen(false)} steps={tourSteps}/>
      </div>
    </ConfigProvider>
  );
}
