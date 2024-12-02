import html2pdf from 'html2pdf.js';

export const generatePDF = (pdfContentRef) => {
  const element = pdfContentRef.current;

  const opt = {
    margin: [10, 0, 10, 0],
    filename: 'senet.pdf',
    image: { type: 'jpeg', quality: 1.0 },
    html2canvas: { scale: 3, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['css', 'legacy'] },
  };

  html2pdf().set(opt).from(element).save();
};
