import jsPDF from "jspdf"
import { NotoSansTC } from "./NotoSansTC-VariableFont_wght-normal"

export function GeneratePDF(sentences, translation, notes) {
        // ----- basic pdf setting -----
        const pdf = new jsPDF({lineHeight: 2})  // default unit: mm
        pdf.addFileToVFS('NotoSansTC-VariableFont_wght-normal.ttf', NotoSansTC)
        pdf.addFont('NotoSansTC-VariableFont_wght-normal.ttf', 'NotoSansTC', 'normal')
        pdf.setFont('NotoSansTC')
        pdf.setFontSize('14')

        const pageWidth = pdf.internal.pageSize.width;
        const pageHeight = pdf.internal.pageSize.height;
        const margins = {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
        }
        const maxWidth = pageWidth - (margins.left + margins.right);
        // ----- end of basic pdf setting -----

        // ----- generate translation section -----
        const translationContent = sentences.map((s, index) => `**${s}\n${translation[index]}`)
        console.log('translationContent: ', translationContent)
        const splitTranslation = translationContent.map(content => {
            const parts = content.split('\n')
            const englishPart = parts[0]
            const chinesePart = parts[1]

            const splitEnglish = pdf.splitTextToSize(englishPart, maxWidth)
            const splitChinese = pdf.splitTextToSize(chinesePart, maxWidth)
            return [...splitEnglish, ...splitChinese]
        })
        // pdf.splitTextToSize(content, maxWidth))
        // const splitTranslation = pdf.splitTextToSize(translationContent, maxWidth)  // split text to fit within the maxWidth
        console.log('splitTranslation: ', splitTranslation)

        let currentY = margins.top;  // starting Y for translation header
        pdf.text('Translation: ', margins.left, currentY)  // add header
        currentY += 10;  // starting Y for translation content

        for (let line of splitTranslation.flat()) {
            if (currentY + 10 > pageHeight - margins.bottom) {  // ensure enough space for new content
                pdf.addPage();
                currentY = margins.top;  // reset margin top for new page
            }
            pdf.text(line, margins.left, currentY)  // output translation content
            currentY += 10  // increase by line height
        }
        // ----- end of generate translation section -----

        currentY += 5; // gap between sections

        // ----- generate notes section -----
        // if (currentY + 10 > pageHeight - margins.bottom) {  // ensure enough space for new content
        //     pdf.addPage();
        //     currentY = margins.top;  // reset margin top for new page
        // }
        // pdf.text('Note: ', margins.left, currentY);
        // currentY += 10;  // staring Y for notes content

        // const notesContent = notes.map(n => `${n.wordInfo}\n`);
        // const splitNotes = pdf.splitTextToSize(notesContent, maxWidth);  // split text to fit within the maxWidth
        // console.log('splitNotes: ', splitNotes)
        // for (let line of splitNotes) {
        //     if (currentY + 10 > pageHeight - margins.bottom) {
        //         pdf.addPage();
        //         currentY = margins.top;
        //     }
        //     pdf.text(line, margins.left, currentY);
        //     currentY += 10;
        // }
        // ----- end of generate notes section -----

        pdf.save('句句通.pdf');
    
}