import { useContext} from "react";
import { AppContext } from "../AppContext";
import { SectionHead } from "./SectionHead";
import { TranslationCheckbox } from "./TranslationCheckbox";

export function TranslationSection() {
  const {
    sentences,
    translation,
    translationLoading,
    translationError,
    darkMode,
    chinese, setChinese,
    english, setEnglish,
    example, setExample,
  } = useContext(AppContext);
  
  const checkboxStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  }

  return (
    <section id="translation-section">
      <SectionHead sectionTitle="翻譯" hintName="translation" />
      {translation.length === 0 && translationLoading ? (
        <div style={{ border: "1px solid #9a9a9a", padding: "15px" }}>
          Loading...
        </div>
      ) : translation.length === 0 && translationError ? (
        <div style={{ border: "1px solid #9a9a9a", padding: "15px" }}>
          {translationError}
        </div>
      ) : translation.length === 0 ? (
        <div
          style={{
            border: "1px solid #9a9a9a",
            padding: "15px",
            color: "#9a9a9a",
          }}
        >
          按「翻譯」後，原句和翻譯會呈現在這區，更多資訊請按上方「問號」。
        </div>
      ) : (
        <ol
          style={{
            border: "1px solid #9a9a9a",
            padding: "11px 4px 11px 42px",
            margin: "0",
          }}
        >
          {sentences.map((s, index) => (
            <li key={index} style={{ padding: "4px 11px" }}>
              <span style={{ color: darkMode ? "#F5F7FA" : "black" }}>{s}</span>
              <br />
              <span style={{ color: darkMode ? "#5fa0ff" : "#b40700" }}>
                {translation[index]}
              </span>
            </li>
          ))}
        </ol>
      )}
      <div style={checkboxStyle}>
        <TranslationCheckbox
          nameC="中文定義"
          nameE="chinese"
          checked={chinese}
          onChange={(e) => setChinese(e.target.checked)}
        />
        <TranslationCheckbox
          nameC="英文解釋"
          nameE="english"
          checked={english}
          onChange={(e) => setEnglish(e.target.checked)}
        />
        <TranslationCheckbox
          nameC="例句"
          nameE="example"
          checked={example}
          onChange={(e) => setExample(e.target.checked)}
        />
      </div>
    </section>
  );
}
