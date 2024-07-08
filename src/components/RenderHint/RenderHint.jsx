export function RenderHint({idName, json}) {
    return (
        <ul>
            {json[idName].map((hint, index) => (
                <li key={index}>{hint}</li>
            ))}
        </ul>
    )
}