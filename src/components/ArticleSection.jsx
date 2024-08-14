import { Icon } from "@iconify/react";
import { Button, Input, Popconfirm } from "antd";
import HintJSON from "../data/hint.json";
import { useContext, useState } from "react";
import { AppContext } from "../AppContext";

export function ArticleSection() {
  const { article, setArticle, setSentences, darkMode } =
    useContext(AppContext);
  const [showHint, setShowHint] = useState(false);
  const { TextArea } = Input;

  const clearArticle = () => {
    setArticle('')
  };

  const ProcessArticle = () => {
    const regex = /[^.!?]+[.!?]+/g; // not start with .!? but end with .!?
    let matchedSentences = article.match(regex);
        
    matchedSentences = matchedSentences.map((s) => s.trim());
    if (matchedSentences) {
      setSentences(matchedSentences);
    }
  };

  return (
    <section id="article-section">
      <div>
        <h2>1. 輸入文章</h2>
        <Icon
          className="icon-questionMark"
          icon="heroicons-outline:question-mark-circle"
          style={{ color: "#5fa0ff", fontSize: "2rem", marginLeft: "5px" }}
          onClick={() => setShowHint((current) => !current)}
        />
      </div>

      <ul className={`hint-div ${showHint ? 'expand' : ''}`}>
        {HintJSON["article"].map((hint, index) => (
          <li key={index}>{hint}</li>
        ))}
      </ul>
      
      <TextArea
        className={darkMode ? "dark-mode renderingWindow" : "renderingWindow"}
        placeholder="請輸入英文原文"
        value={article}
        onChange={(e) => setArticle(e.target.value)}
        autoSize
        style={{ backgroundColor: "inherit" }}
      />
      <div>
        <Popconfirm
          placement='left'
          title='確定清除文字？'
          onConfirm={clearArticle}
          onText='Yes'
          cancelText='No'
        >
          <Button>清除文字</Button>
        </Popconfirm>
        <Button type="primary" onClick={ProcessArticle}>
          陳列句子
        </Button>
      </div>
    </section>
  );
}
