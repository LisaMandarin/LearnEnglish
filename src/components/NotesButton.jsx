import { Button, Popconfirm, message, Space } from "antd"
import { DownloadOutlined } from "@ant-design/icons"
import { useContext } from "react";
import { AppContext } from "../AppContext";
import { GeneratePDF } from "../utils/GeneratePDF";

export function NotesButton() {
    const { 
        setNotes, 
        setNotesError,
        sentences,
        translation,
        notes,
        prevStep,
        resetApp,
    } = useContext(AppContext)

    // clear all notes containers
    const clearNotes = () => {
        setNotes([]);
        setNotesError(null);
    };

    return (
        <div>
            <Space wrap>
                <Button type="primary" onClick={() => prevStep()}>回上頁查詢單字</Button>
                <Button
                    icon={<DownloadOutlined />}
                    iconPosition="end"
                    onClick={async() => {
                        await GeneratePDF(sentences, translation, notes);
                        message.success('你的筆記已下載完畢')
                    }}
                >
                    PDF生成
                </Button>
                <Popconfirm
                    placement="left"
                    title='確定清除全部筆記'
                    onConfirm={clearNotes}
                    okText='Yes'
                    cancelText='No'
                >
                    <Button>清除全部筆記</Button>
                </Popconfirm>
                <Popconfirm
                    placement="left"
                    title='確定要回到第一步？這將清除所有資料。'
                    onConfirm={resetApp}
                    okText='Yes'
                    cancelText='No'
                >
                    <Button danger>重新開始</Button>
                </Popconfirm>
            </Space>
            
        </div>        
    )
}