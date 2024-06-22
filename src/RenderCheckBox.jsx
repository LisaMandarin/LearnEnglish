import { useEffect, useState } from "react";

export function RenderCheckBox({json, objKey}) {
    const [ lookupKeys, setLookupKeys ] = useState([])
    
    useEffect(() => {
        setLookupKeys(json[objKey].map(item => Object.keys(item)[0]))
    })
    // console.log(lookupKeys)
    return (
        <>
            {lookupKeys.map((lookupKey, index) => (
                <label key={index} htmlFor={lookupKey}>
                    <input id={lookupKey} />
                    {json[objKey][lookupKey]}
                </label>
            ))}
        </>
    )
}