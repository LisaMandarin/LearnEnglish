    import './Section.css'
    import { useState } from 'react';
    import { Icon } from '@iconify/react';
    import HintJSON from './hint.json'
    import AreaJSON from './area.json'
    import { RenderHint } from './RenderHint';
    import { RenderArea } from './RenderArea';
    // import { RenderCheckBox } from './RenderCheckBox';

    export function Section({ title, idName, button1, button2 }) {
        const [ showHint, setShowHint ] = useState(false)
        const [ area, setArea ] = useState(AreaJSON)
            
        function clearContent() {
            setArea(current => (
                {...current,
                [idName]: []
                }
            ))
        }

        return (
            <section className='card' id={idName}>
                
                {/* section title */}
                <h1>
                    {title}<Icon icon="ph:question" onClick={() => setShowHint(current => !current)}/>
                </h1>
                
                {/* Hint Box */}
                <div>
                    {showHint && (
                        <>
                            <RenderHint idName={idName} json={HintJSON}/>
                        </>
                    )}
                </div>
                
                {/* Input and Output Area */}
                <div contentEditable className='area'>
                    <RenderArea idName={idName} json={area}/>
                </div>
                
                {/* Buttons */}
                <div className='buttonBox'>
                    <button type='button' onClick={clearContent}>{button1}</button>
                    <button type='button' >{button2}</button>
                    {/* {idName === 'translation' && (
                        <RenderCheckBox json={AreaJSON} objKey='lookup' />
                    )} */}
                </div>
            </section>
        )
    }