import { Switch } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useContext } from "react";
import "./App.css";
import { ArticleSection } from "./components/ArticleSection";
import { SentencesSection } from "./components/SentencesSection";
import { TranslationSection } from "./components/TranslationSection";
import { NotesSection } from "./components/NotesSection";

import { AppContext } from "./AppContext";

export default function App() {
  const { darkMode, setDarkMode } = useContext(AppContext);

  const onChange = (checked) => {
    setDarkMode(checked);
  };

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <header>
        <div className="switch">
          <SunOutlined />
          <Switch defaultChecked onChange={onChange} />
          <MoonOutlined />
        </div>
        <h1>句句通</h1>
        <div style={{textAlign: "center", color: darkMode ? "#F5F7FA" : "#1054b5"}}>
          <p>
            把英文文章分句翻譯，也可以查詢單詞意思，最後把翻譯和查詢的資料編輯後炇成pdf檔儲存。
          </p>
          <p>👉🏻👉🏻請按照以下的步驟1→2→3→4完成你的筆記</p>
        </div>
      </header>
      <main>
        <ArticleSection />
        <SentencesSection />
        <TranslationSection />
        <NotesSection />
      </main>
    </div>
  );
}
