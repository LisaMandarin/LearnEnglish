import { useContext} from "react";
import { AppContext } from "../AppContext";
import { SectionHead } from "./SectionHead";
import { RenderNote } from "./RenderNotes";

export function NotesSection() {
  const { notes, darkMode } = useContext(AppContext);
  
  

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
      
      
    </section>
  );
}
