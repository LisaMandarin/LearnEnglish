import { Input } from "antd";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import { SectionHead } from "./SectionHead";

export function SentencesSection() {
  const {
    sentences,
    setSentences,
    darkMode,
  } = useContext(AppContext);
  const { TextArea } = Input;

  const maxCount = 5000;
  const totalCount = sentences.reduce(
    (acc, sentence) => acc + sentence.length,
    0
  );

  const handleTextareaChange = (value, index) => {
    const newSentences = [...sentences];
    if (value.trim() === "") {
      newSentences.splice(index, 1); // remove empty string during onChange
    } else {
      newSentences[index] = value;
    }
    setSentences(newSentences);
  };

  

  return (
    <section id="sentences-section">
      <SectionHead sectionTitle="2. 陳列句子" hintName="sentences" />
      {sentences.length === 0 ? (
        <div
          style={{
            border: "1px solid #9a9a9a",
            padding: "15px",
            color: "#9a9a9a",
          }}
        >
          按「陳列句子」後，句子會條列在這區，更多資訊請按上方「問號」。
        </div>
      ) : (
        <>
          <ol
            className={darkMode ? "dark-mode" : ""}
            style={{
              border: "1px solid #9a9a9a",
              padding: "11px 4px 11px 42px",
              margin: "0",
            }}
          >
            {sentences.map((s, index) => (
              <li key={index}>
                <TextArea
                  className={darkMode ? "dark-mode" : ""}
                  placeholder="句子"
                  value={`${s}`}
                  onChange={(e) => handleTextareaChange(e.target.value, index)}
                  autoSize
                  style={{
                    fontSize: "1rem",
                    backgroundColor: "inherit",
                    display: "block",
                    border: 0,
                  }}
                />
              </li>
            ))}
          </ol>
          <div
            style={{
              textAlign: "right",
              color: darkMode ? "#F5F7FA" : "rgba(0, 0, 0, 0.45)",
            }}
          >
            {totalCount} / {maxCount}
          </div>
        </>
      )}

      
    </section>
  );
}
