import { Button, Space } from "antd"
import { useContext } from "react"
import { AppContext } from "../AppContext"
import { openAIResult } from "../APIs/openai"
import { UseLookupTerms } from "./UseLookupTerms"
import { useEffect } from "react"

export function TranslationButton() {
    const { 
        setNotesLoading, setNotesError, setNotes,
        chinese, english, example,
        termChinese, termEnglish, termExample,
        selectedText, setSelectedText,
        lookupTerms, setLookupTerms,
        prevStep, nextStep 
    } = useContext(AppContext)
    
    // toggle checkboxes and save the values to lookupTerms
    UseLookupTerms({
        setLookupTerms,
        english,
        chinese,
        example,
        termChinese,
        termEnglish,
        termExample,
    });

    // detect text selection (desktop and mobile)
    useEffect(() => {
        const handleSelectionChange = () => {
            const selection = document.getSelection();
            const text = selection ? selection.toString().trim() : "";

            setSelectedText(text);
        };

        document.addEventListener("selectionchange", handleSelectionChange);
        document.addEventListener("touchend", handleSelectionChange);

        return () => {
            document.removeEventListener("selectionchange", handleSelectionChange);
            document.removeEventListener("touchend", handleSelectionChange);
        };
    }, [setSelectedText]);

    // Look up the selected text through OpenAI
    const Lookup = async () => {
        if (!chinese && !english && !example) {
            alert("請勾選「中文」、「English」、或「例句」");
            return;
        }
        if (!selectedText) {
            alert("請先選取字再查單詞");
            return;
        }

        nextStep();

        openAIResult(
            termChinese,
            termEnglish,
            termExample,
            selectedText,
            lookupTerms,
            setNotesLoading,
            setNotesError,
            setNotes
        );
        
  };

    return (
        <div>
            <Space wrap>
                <Button onClick={() => prevStep()}>上一步</Button>
                <Button type="primary" onClick={Lookup}>
                    查詢單字
                </Button>
                {/* <Button onClick={() => nextStep()}>下一步</Button> */}
            </Space>
        </div>
    )
}