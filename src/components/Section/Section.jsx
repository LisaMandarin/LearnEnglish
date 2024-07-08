    import './Section.css'
    import { useState } from 'react';
    import { Icon } from '@iconify/react';
    import HintJSON from '../../data/hint.json'
    import AreaJSON from '../../data/area.json'
    import LookupJSON from '../../data/lookupCheckbox.json'
    import { RenderHint } from '../RenderHint/RenderHint';
    import { RenderArea } from '../RenderArea/RenderArea';
    import { RenderCheckBox } from '../RenderCheckBox/RenderCheckBox';
    import { BreakSentence } from '../BreakSentence/BreakSentence';

    export function Section({ title, idName, button1, button2, divRef1, divRef2 }) {
        const [ showHint, setShowHint ] = useState(false)
        const [ area, setArea ] = useState(AreaJSON[idName] || [])
            
        function clearContent() {
            setArea([])
        }
        function executeFunction() {
            if (idName === 'original') {
                BreakSentence(divRef1, divRef2)
            } else {
                return
            }
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
                <div contentEditable className='area' ref={divRef1}>
                    <RenderArea idName={idName} jsonArray={area}/>
                </div>
                
                {/* Buttons */}
                <div className='buttonBox'>
                    <button type='button' onClick={clearContent}>{button1}</button>
                    <button type='button' onClick={executeFunction}>{button2}</button>
                    {idName === 'translation' && (
                        <RenderCheckBox json={LookupJSON} />
                    )}
                </div>
            </section>
        )
    }