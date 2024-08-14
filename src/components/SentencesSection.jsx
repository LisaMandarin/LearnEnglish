import { Icon } from "@iconify/react";
import { Button, Input, Popconfirm } from "antd";
import HintJSON from "../data/hint.json";
import { microsoftTranslator } from "./APIs/microsoft-translator";
import { useContext, useState } from "react";
import { AppContext } from "../AppContext";

export function SentencesSection() {
  const {
    sentences,
    setSentences,
    darkMode,
    setTranslationLoading,
    setTranslationError,
    setTranslation,
  } = useContext(AppContext);
  const [showHint, setShowHint] = useState(false);
  const { TextArea } = Input;

  const clearSentences = () => setSentences([""]);
  ;

  const handleTextareaChange = (value, index) => {
    const newSentences = [...sentences];
    if (value.trim() === "" && sentences.length > 1) {
      newSentences.splice(index, 1); // remove empty string during onChange
    } else {
      newSentences[index] = value;
    }
    setSentences(newSentences);
  };

  const ProcessSentences = () => {
    microsoftTranslator(
      sentences,
      setSentences,
      setTranslationLoading,
      setTranslationError,
      setTranslation
    );
  };

  return (
    <section id="sentences-section">
      <div>
        <h2>2. 陳列句子</h2>
        <Icon
          className="icon-questionMark"
          icon="heroicons-outline:question-mark-circle"
          style={{ color: "#5fa0ff", fontSize: "2rem", marginLeft: "5px" }}
          onClick={() => setShowHint((current) => !current)}
        />
      </div>
        <ul className={`hint-div ${ showHint ? 'expand' : ''}`}>
          {HintJSON["sentences"].map((hint, index) => (
            <li key={index}>{hint}</li>
          ))}
        </ul>
      <ul className="renderingWindow">
        {sentences.map((s, index) => (
          <li key={index}>
            <TextArea
              className={darkMode ? "dark-mode" : ""}
              placeholder="句子"
              value={`${s}`}
              onChange={(e) => handleTextareaChange(e.target.value, index)}
              autoSize
              style={{ fontSize: "1rem", backgroundColor: "inherit" }}
            />
          </li>
        ))}
      </ul>
      <div>
        <Popconfirm
          placement='left'
          title='確定清除文字？'
          onConfirm={clearSentences}
          okText='Yes'
          cancelText='No'
          >
          <Button>清除文字</Button>
        </Popconfirm>
        <Button type="primary" onClick={ProcessSentences}>
          翻譯
        </Button>
      </div>
    </section>
  );
}
