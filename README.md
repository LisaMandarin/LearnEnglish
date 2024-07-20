This is a REACT app that can translate an English paragraph into Traditional Chinese and then look up the words individually.  Users can turn the result into a PDF file.

Components
-BreakSentence: break paragraphs into individual sentences line by line
-Header: show the description of the app
-Lookup: turn the selected text into word details including part of speech, traditional Chinese definition, English definition, and an example sentence by fetching OpenAI API
-RenderArea: show the 4 main areas of the app including 1) 輸入文字, 2) 陳列句子, 3) 翻譯, and 4) 筆記
-RenderHint: instruct the users how to execute the functions
-Section: display the layout of the app
-Translate: turn the sentences into traditional Chinese by fetching Microsoft Translator API