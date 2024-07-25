import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { Hint } from './Hint';

export function Section({sectionKey, title, json, placeholder, buttons}) {
    const [ content, setContent ] = useState('')
    const [ showHint, setShowHint ] = useState(false)
    
    const clearContent = () => setContent('')

    useEffect(() => console.log("Content: ", content), [content])
    return (
        <section>
            <div>
                <h2>{title}</h2>
                <Icon icon="heroicons-outline:question-mark-circle" 
                  style={{color: '#207BFF', fontSize: '2rem', marginLeft: '5px'}}
                  onClick={() => setShowHint(current => !current)}
                  />
            </div>
            { showHint && <Hint json={json[sectionKey]}/> }
            <textarea placeholder={placeholder}
                      value={content}
                      onChange={e => setContent(e.target.value)} />
            <div>
                <button onClick={clearContent}>清除文字</button>
                {buttons}
            </div>
        </section>
    )
}