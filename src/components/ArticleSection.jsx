import { Input } from "antd";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import { SectionHead } from "./SectionHead";

export function ArticleSection({ textRef }) {
  const { article, setArticle, darkMode } =
    useContext(AppContext);
  const { TextArea } = Input;

  return (
    <section id="article-section">
      <SectionHead 
        sectionTitle="1. 輸入英文文章"
        hintName="article"
        />
      <div ref={textRef}>
        <TextArea
          className={darkMode ? "dark-mode" : ""}
          showCount
          maxLength={1000}
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
      </div>
    </section>
  );
}
