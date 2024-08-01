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
            left: 20,
            right: 20,
            top: 20,
            bottom: 20
        }
        const maxWidth = pageWidth - (margins.left + margins.right);
        // ----- end of basic pdf setting -----

        // ----- generate translation section -----
        const translationContent = sentences.map((s, index) => `**${s}\n   ${translation[index]}`)
        const splitTranslation = translationContent.map(content => {
            const parts = content.split('\n')
            const englishPart = parts[0]
            const chinesePart = parts[1]

            const splitEnglish = pdf.splitTextToSize(englishPart, maxWidth)
            const splitChinese = pdf.splitTextToSize(chinesePart, maxWidth)
            return [...splitEnglish, ...splitChinese]
        })

        let currentY = margins.top;  // starting Y for translation header
        pdf.text('Translation: ', margins.left, currentY)  // add header
        currentY += 20;  // starting Y for translation content

        for (let line of splitTranslation.flat()) {
            if (currentY + 20 > pageHeight - margins.bottom) {  // ensure enough space for new content
                pdf.addPage();
                currentY = margins.top;  // reset margin top for new page
            }
            pdf.text(line, margins.left, currentY)  // output translation content
            currentY += 10  // increase by line height
        }
        // ----- end of generate translation section -----

        currentY += 10; // gap between sections

        // ----- generate notes section -----
        if (currentY + 20 > pageHeight - margins.bottom) {  // ensure enough space for new content
            pdf.addPage();
            currentY = margins.top;  // reset margin top for new page
        }
        pdf.text('Note: ', margins.left, currentY);
        currentY += 10;  // staring Y for notes content

        for (let note of notes) {
            const splitNote = pdf.splitTextToSize(note.wordInfo, maxWidth).filter(line => line !== '');  // split each note text to fit within the maxWidth and filter out empty strings
            for (let line of splitNote) {
                if (currentY + 20 > pageHeight - margins.bottom) {
                    pdf.addPage();
                    currentY = margins.top;
                }
                pdf.text(line, margins.left, currentY)
                currentY += 10;
            }
            currentY += 10;  // gap between notes
        }
        // ----- end of generate notes section -----
        pdf.save('句句通.pdf');
        }
    
