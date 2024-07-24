import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Hint } from './Hint';

export function Section({sectionKey, title, json, placeholder, buttons}) {
    const [ showHint, setShowHint ] = useState(false)
    
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
            <textarea placeholder={placeholder} />
            <div>
                {buttons}
            </div>
        </section>
    )
}