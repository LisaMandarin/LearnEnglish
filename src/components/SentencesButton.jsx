import { Button, Space } from "antd"
import { useContext } from "react";
import { AppContext } from "../AppContext";
import { microsoftTranslator } from "../APIs/microsoft-translator";

export function SentencesButton() {
    const { 
        sentences,
        setSentences,
        setTranslationLoading,
        setTranslationError,
        setTranslation,
        nextStep,
        prevStep
    } = useContext(AppContext)

    const ProcessSentences = () => {
        microsoftTranslator(
          sentences,
          setSentences,
          setTranslationLoading,
          setTranslationError,
          setTranslation
        );
      };

    return (
        <div>
            <Space wrap>
                <Button onClick={() => prevStep()}>上一步</Button>
                <Button type="primary" onClick={() => {ProcessSentences(); nextStep();}}>
                翻譯
                </Button>
                <Button onClick={() => nextStep()}>下一步</Button>
            </Space>
        </div>
    )
}