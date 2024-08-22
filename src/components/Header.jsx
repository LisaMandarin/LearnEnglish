import { useContext } from "react"
import { AppContext } from "../AppContext"

export function Header() {
    const { darkMode } = useContext(AppContext)
    return (
        <header>
            <h1>句句通</h1>
            <div style={{textAlign: "center", color: darkMode ? "#F5F7FA" : "#1054b5"}}>
            <p>
                把英文文章分句翻譯，也可以查詢單詞意思，最後把翻譯和查詢的資料編輯後變成pdf檔儲存。
            </p>
            <p>👉🏻👉🏻請按照以下的步驟1→2→3→4完成你的筆記</p>
            </div>
        </header>
    )
}