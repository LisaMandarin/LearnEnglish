    import './Section.css'
    import { forwardRef, useState } from 'react';
    import { Icon } from '@iconify/react';
    import HintJSON from '../../data/hint.json'
    import AreaJSON from '../../data/area.json'
    import LookupJSON from '../../data/lookupCheckbox.json'
    import { RenderHint } from '../RenderHint/RenderHint';
    import { RenderArea } from '../RenderArea/RenderArea';
    import { RenderCheckBox } from '../RenderCheckBox/RenderCheckBox';
    import { BreakSentence } from '../BreakSentence/BreakSentence';
    import { Translate } from '../Translate/Translate.jsx'
    

    const Section = forwardRef(({ title, idName, button1, button2, nextDivRef }, divRef) => {
        const [ showHint, setShowHint ] = useState(false)
        const [ area, setArea ] = useState(AreaJSON[idName] || [])
        const [ showBreakSentence, setShowBreakSentence ] = useState(false)
        const [ showTranslate, setShowTranslate ] = useState(false)

        function clearContent() {
            setArea([])
            if (divRef.current) {
                divRef.current.innerHTML = ''
            }
        }

        function executeFunction() {
            if (idName === 'original') {
                setShowBreakSentence(true)
            }
            if (idName === 'list') {
                setShowTranslate(true)
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
                <div contentEditable className='area' ref={divRef}>
                    <RenderArea idName={idName} jsonArray={area} />
                    {showBreakSentence && <BreakSentence divRef={divRef} nextDivRef={nextDivRef} />}
                    {showTranslate && <Translate divRef={divRef} nextDivRef={nextDivRef} />}
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
    })

Section.displayName = 'Section'
export default Section