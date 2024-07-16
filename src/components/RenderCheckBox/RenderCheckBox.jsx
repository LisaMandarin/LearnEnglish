import { useEffect, useState } from "react";

export function RenderCheckBox({json, setIsAnyChecked}) {
    const [ lookupKeys, setLookupKeys ] = useState([])
    const [ checkboxes, setCheckboxes ] = useState({})
    
    // Set the lookup keys when json or objKey changes
    // Set the initial value of checkboxes to false
    useEffect(() => {
        const initialCheckboxes = Object.keys(json).reduce((acc, key) => {
            acc[key] = false;  // {chinese: false, english: false, example: false}
            return acc
        }, {})
        setLookupKeys(Object.entries(json))
        setCheckboxes(initialCheckboxes)
    }, [json])
    
    // update the state of checkboxes
    const handleCheckboxChange = (key, checked) => {
        setCheckboxes(current => {
            const updated = { ...current, [key]: checked }  // receive the current state of checkboxes and update the boolean value of a certain key
            const isAnyChecked = Object.values(updated).some(value => value)  // return true if at least one true value
            setIsAnyChecked(isAnyChecked)
            return updated
            })
        }
        return (
            <>
                {lookupKeys.map(([key, value], index) => (
                    <label key={index} htmlFor={key}>
                        <input type="checkbox" id={key} onChange={e => handleCheckboxChange(key, e.target.checked)}/>
                        {value}
                    </label>
                ))}
            </>
        )
    }