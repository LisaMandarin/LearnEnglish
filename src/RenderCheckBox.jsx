import { useEffect, useState } from "react";

export function RenderCheckBox({json, objKey}) {
    const [ lookupKeys, setLookupKeys ] = useState([])
    
    // Set the lookup keys when json or objKey changes
    useEffect(() => {
        setLookupKeys(Object.entries(json[objKey]))
    }, [json, objKey])
    
    return (
        <>
            {lookupKeys.map(([key, value], index) => (
                <label key={index} htmlFor={key}>
                    <input type="checkbox" id={key} />
                    {value}
                </label>
            ))}
        </>
    )
}