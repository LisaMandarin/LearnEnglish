import { Icon} from '@iconify/react'
import { Button, Input } from 'antd'
import HintJSON from '../data/hint.json'
import { useState } from 'react'

export function ArticleSection({article, setArticle, setSentences, darkMode}) {
    const [ showHint, setShowHint ] = useState(false)
    const { TextArea } = Input
    const clearArticle = () => {
        const confirmed = window.confirm('確定清除文字？')
        if (confirmed) {
            setArticle('')
        }
    }
    
    const ProcessArticle = () => {
        const regex = /[^.!?]+[.!?]+/g  // not start with .!? but end with .!?
        let matchedSentences = article.match(regex)
        matchedSentences = matchedSentences.map(s => s.trim())
        if (matchedSentences) {
            setSentences(matchedSentences)
        }
    }

    return (
        <section>
            <div>
                <h2>1. 輸入文章</h2>
                <Icon className='icon-questionMark'
                    icon="heroicons-outline:question-mark-circle" 
                    style={{color: '#207BFF', fontSize: '2rem', marginLeft: '5px'}}
                    onClick={() => setShowHint(current => !current)}
                  />
            </div>

            {showHint && (
                <ul>
                    {HintJSON['article'].map((hint, index) => (
                        <li key={index}>{hint}</li>
                    ))}
                </ul>
            )}
            <TextArea
                className={ darkMode ? 'dark-mode renderingWindow' : 'renderingWindow'}
                placeholder='請輸入英文原文'
                value={article}
                onChange={e => setArticle(e.target.value)}
                autoSize
                style={{backgroundColor: 'inherit'}}
                />
            <div>
                <Button onClick={clearArticle}>清除文字</Button>
                <Button type='primary' onClick={ProcessArticle}>陳列句子</Button>
            </div>
        </section>
    )
}