import { useContext } from "react"
import { AppContext } from "../AppContext"
import Input from "antd/es/input/Input"

export function RenderNote() {
    const { notes, darkMode, setNotes } = useContext(AppContext)
    const { TextArea } = Input;

    // dynamically change the value of textarea
    const handleTextareaChange = (value, id) => {
        const newNotes = notes.map((n) => {
        if (n.id === id) {
            return { ...n, wordInfo: value };
        }
        return n;
        });
        setNotes(newNotes);
    };

    // delete note button on the top-right corner of each note
    const deleteNote = (id) => {
        const newNotes = notes.filter((n) => n.id !== id);
        setNotes(newNotes);
    };

    return (
        <div
            style={{
            border: "1px solid #9a9a9a",
            padding: "15px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, 250px)",
            gridGap: "15px",
            }}
        >
            {notes && notes.map((n) => (
            <div 
                key={n.id}
                style={{
                position: "relative",
                }}>
                <button
                className={darkMode ? "dark-mode" : ""}
                style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1rem",
                    color: "inherit",
                    zIndex: "10"
                    }}
                onClick={() => deleteNote(n.id)}
                >
                X
                </button>
                <TextArea
                    className={darkMode ? "dark-mode" : ""}
                    value={n.wordInfo}
                    onChange={(e) => handleTextareaChange(e.target.value, n.id)}
                    autoSize
                    style={{
                    backgroundColor: "inherit",
                    fontSize: "1rem",
                    border: "1px solid #9a9a9a",
                    boxShadow: "1px 1px 3px #9a9a9a"
                    }}
                />
            </div>
            ))}
        </div>
    )
}