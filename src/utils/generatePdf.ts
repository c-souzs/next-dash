import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';

const generatePdf = (title: string, heads: string[], data: (string | number)[][], namePdf: string) => {
    const doc = new jsPDF({
        orientation: "landscape",
    });

    const finalY = (doc as any).lastAutoTable.finalY || 10;

    doc.setFontSize(20);
    doc.text(title, 14, finalY + 15);

    autoTable(doc, {html: '', styles: {cellPadding: 1, fontSize: 10}});
    autoTable(doc, {
        head: [heads],
        body: data,
        startY: finalY + 20,
        showHead: 'firstPage'
    });

    doc.save(`${namePdf}.pdf`);
}

export default generatePdf;