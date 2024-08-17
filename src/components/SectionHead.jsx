import { Icon } from "@iconify/react";
import HintJSON from "../data/hint.json";
import { useState } from "react";

export function SectionHead({sectionTitle, hintName,}) {
    const [ showHint, setShowHint ] = useState(false)
    return (
        <>
            <div>
                <h2>{sectionTitle}</h2>
                <Icon
                className="icon-questionMark"
                icon="heroicons-outline:question-mark-circle"
                style={{ color: "#5fa0ff", fontSize: "2rem", marginLeft: "5px" }}
                onClick={() => setShowHint((current) => !current)}
                />
            </div>

            <ul className={`hint-div ${showHint ? 'expand' : ''}`}>
                {HintJSON[hintName].map((hint, index) => (
                    <li key=  {index}>{hint}</li>
                    ))}
            </ul>
        </>
    )
}