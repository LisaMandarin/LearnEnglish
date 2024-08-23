import { Button, Popconfirm, Space } from "antd";
import { useContext } from "react";
import { AppContext } from "../AppContext";

export function ArticleButton() {
    const { article, setArticle, setSentences, nextStep } = useContext(AppContext)
    const clearArticle = () => {
        setArticle('')
      };
    
    const ProcessArticle = () => {
      const regex = /[^.!?]+[.!?]+/g; // not start with .!? but end with .!?
      let matchedSentences = article.match(regex);
      
      if (!matchedSentences || matchedSentences.length === 0) {
        alert('請提供正確的文章，包括標點符號。')
        setArticle('')
        return
      }

      nextStep();

      matchedSentences = matchedSentences.map((s) => s.trim());
      if (matchedSentences) {
        setSentences(matchedSentences);
      }
    };

    return (
        <div>
          <Space wrap>
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
            <Button onClick={() => nextStep()}>下一步</Button>
          </Space>
        </div>
    )
}