import { Button, Popconfirm } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useContext} from "react";
import { GeneratePDF } from "../utils/GeneratePDF.js";
import { AppContext } from "../AppContext";
import { SectionHead } from "./SectionHead";
import { RenderNote } from "./RenderNotes";

export function NotesSection() {
  const { sentences, 
          translation,
          notes,      
          setNotes, 
          setNotesError, 
          darkMode 
           } =
    useContext(AppContext);
  
  // clear all notes containers
  const clearNotes = () => {
      setNotes([]);
      setNotesError(null);
  };

  return (
    <section id="notes-section">
      <SectionHead 
        sectionTitle="筆記"
        hintName="notes"
      />
        {notes && notes.length > 0 ? (
          <RenderNote />
        ) : (
          <div
            style={{padding: "15px", border: "1px solid #9a9a9a", color: '#9a9a9a'}}
            className={ darkMode ? 'dark-mode' : ''}
            >
            按「查詢單字」後，單字解釋會呈現在這區，更多資訊請按上方「問號」
          </div>
        )}
      
      <div>
        <Popconfirm
          placement="left"
          title='確定清除全部筆記'
          onConfirm={clearNotes}
          okText='Yes'
          cancelText='No'
        >
          <Button>清除全部筆記</Button>
        </Popconfirm>
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          iconPosition="end"
          onClick={async() => await GeneratePDF(sentences, translation, notes)}
        >
          PDF生成
        </Button>
      </div>
    </section>
  );
}
