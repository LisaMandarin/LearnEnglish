import React from "react"

export function RenderArea({idName, json}) {
    
    return (
        <>
            {/* originalArea text */}
            {idName === 'original' && (
            <ul>
                {json[idName].map((text, index) => (
                    <li key={index}>{text}</li>
                ))}
            </ul>
            )}

            {/* listArea text */}
            {idName === 'list' && (
                <ul>
                    {json[idName].map((text, index) => (
                        <li key={index}>{text}</li>
                    ))}
                </ul>
            )}

            {/* translationArea text */}
            {idName === 'translation' && (
                <ul>
                    {json[idName].map((text, index) => (
                        <div key={index}>
                            <li className="original-text">{text.original}</li>
                            <li className="translated-text">{text.translated}</li>
                        </div>
                    ))}
                </ul>
            )}

            {/* notesArea text */}
            {idName === 'notes' && (
                <>
                    {json[idName].map((text, index) => (
                        <div key={index}>{text}</div>
                    ))}
                </>
            )}
        </>
    )
}