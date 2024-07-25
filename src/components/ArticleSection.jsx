import { Icon} from '@iconify/react'
import HintJSON from '../data/hint.json'
import { useEffect, useState } from 'react'

export function ArticleSection({article, setArticle, setSentences}) {
    const [ showHint, setShowHint ] = useState(false)
    const clearArticle = () => setArticle('')
    const ProcessArticle = () => {
        const regex = /[^.!?]+[.!?]+/g  // not start with .!? but end with .!?
        const matchedSentences = article.match(regex)
        if (matchedSentences) {
            setSentences(matchedSentences)
        }
    }

    useEffect(() => console.log('article: ', article), [article])

    return (
        <section>
            <div>
                <h2>1. 輸入文章</h2>
                <Icon icon="heroicons-outline:question-mark-circle" 
                  style={{color: '#207BFF', fontSize: '2rem', marginLeft: '5px'}}
                  onClick={() => setShowHint(current => !current)}
                  />
            </div>

            <ul>
                { showHint && HintJSON['article'].map((hint, index) => (
                    <li key={index}>{hint}</li>
                ))}                 
            </ul>
            <textarea
                placeholder='請輸入英文原文'
                value={article}
                onChange={e => setArticle(e.target.value)}
                />
            <div>
                <button onClick={clearArticle}>清除文字</button>
                <button onClick={ProcessArticle}>陳列句子</button>
            </div>
        </section>
    )
}