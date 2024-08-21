import "./App.css";
import { ArticleSection } from "./components/ArticleSection";
import { SentencesSection } from "./components/SentencesSection";
import { TranslationSection } from "./components/TranslationSection";
import { NotesSection } from "./components/NotesSection";
import { ArticleButton } from "./components/ArticleButton";
import { useContext } from "react";
import { AppContext } from "./AppContext";
import { SwitchDarkMode } from "./components/SwitchDarkMode";
import { Header } from "./components/Header";
import { Button, message, Steps, theme } from "antd";
import { SentencesButton } from "./components/SentencesButton";
import { TranslationButton } from "./components/TranslationButton";
import { NotesButton } from "./components/NotesButton";

export default function App() {
  const { darkMode, stepCurrent } = useContext(AppContext);
  const steps = [ 
    {
      title: '輸入英文文章',
      content: <ArticleSection />
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
  const { token } = theme.useToken();
  const items = steps.map(item => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <div 
      className={darkMode ? "dark-mode" : ""}
      style={{height: '100vh'}}>
      <SwitchDarkMode />
      <Header />
      <Steps current={stepCurrent} items={items}/>
      <div>{steps[stepCurrent].content}</div>
      <div style={{marginTop: 24, display: 'flex', justifyContent: 'center'}}>
        {stepCurrent === 0 && <ArticleButton />}
        {stepCurrent === 1 && <SentencesButton />}
        {stepCurrent === 2 && <TranslationButton />}
        {stepCurrent === 3 && <NotesButton />}        
      </div>
    </div>
  );
}
