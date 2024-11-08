import { useContext, useState } from "react"
import { AppContext } from "../AppContext"
import { Button } from "antd"

export function Header({setOpen}) {
    const { darkMode } = useContext(AppContext)

    return (
        <header>
            <div>
                <h1>句句通</h1>
                <Button 
                    onClick={() => setOpen(true)}
                    style={{
                        display: "inline-block",
                        marginLeft: "5px",
                        backgroundColor: "black",
                        color: "white"
                    }}
                >
                    導覽
                </Button>
            </div>
            <div style={{textAlign: "center", color: darkMode ? "#F5F7FA" : "#1054b5"}}>
            <p>
                把英文文章分句翻譯，也可以查詢單詞意思，最後把翻譯和查詢的資料編輯後變成pdf檔儲存。
            </p>
            <p>👉🏻👉🏻請按照以下的步驟1→2→3→4完成你的筆記</p>
            </div>
        </header>
    )
}