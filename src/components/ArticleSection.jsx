import { Button, Input, Popconfirm } from "antd";
import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { SectionHead } from "./SectionHead";

export function ArticleSection() {
  const { article, setArticle, setSentences, darkMode } =
    useContext(AppContext);
  const { TextArea } = Input;

  const clearArticle = () => {
    setArticle('')
  };

  const ProcessArticle = () => {
    const regex = /[^.!?]+[.!?]+/g; // not start with .!? but end with .!?
    let matchedSentences = article.match(regex);
    
    if (!matchedSentences || matchedSentences.length === 0) {
      alert('Please provide meaningful sentences.')
      setArticle('')
      return
    }
    matchedSentences = matchedSentences.map((s) => s.trim());
    if (matchedSentences) {
      setSentences(matchedSentences);
    }
  };

  return (
    <section id="article-section">
      <SectionHead 
        sectionTitle="1. 輸入英文文章"
        hintName="article"
        />
      <TextArea
        className={darkMode ? "dark-mode" : ""}
        showCount
        maxLength={10000}
        placeholder="請貼上英文文章，更多資訊請按上方「問號」。"
        value={article}
        onChange={(e) => setArticle(e.target.value)}
        autoSize
        style={{ 
          backgroundColor: "inherit", 
          marginBottom: "17px", // marginBottom: leave room for showCount
          borderRadius: 0,
          padding: "11px 4px",
          fontSize: "1rem"
        }}  
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
