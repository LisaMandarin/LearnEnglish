export function RenderArea({idName, jsonArray}) {
    
    return (
        <>
            {/* originalArea text */}
            {idName === 'original' && (
            <ul>
                {jsonArray.map((text, index) => (
                    <li key={index}>{text}</li>
                ))}
            </ul>
            )}

            {/* listArea text */}
            {idName === 'list' && (
                <ul>
                    {jsonArray.map((text, index) => (
                        <li key={index}>{text}</li>
                    ))}
                </ul>
            )}

            {/* translationArea text */}
            {idName === 'translation' && (
                <ul>
                    {jsonArray.map((text, index) => (
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
                    {jsonArray.map((text, index) => (
                        <div key={index}>{text}</div>
                    ))}
                </>
            )}
        </>
    )
}