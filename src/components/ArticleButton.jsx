import { Button, Popconfirm, Space } from "antd";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import nlp from "compromise";

export function ArticleButton({ clearRef, processRef }) {
    const { article, setArticle, setSentences, nextStep } = useContext(AppContext)

    const clearArticle = () => {
        setArticle('')
      };
    
    const ProcessArticle = () => {
      const matchedSentences = nlp(article).sentences().out('array')
    
      if (!matchedSentences || matchedSentences.length === 0) {
        alert('請提供正確的文章，包括標點符號。')
        setArticle('')
        return
      }

      nextStep();

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
              <Button ref={clearRef}>清除文字</Button>
            </Popconfirm>
            <Button type="primary" onClick={ProcessArticle} ref={processRef}>
              陳列句子
            </Button>
          </Space>
        </div>
    )
}