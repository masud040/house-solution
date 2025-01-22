import { PDFDocument, rgb } from "pdf-lib";

export async function generatePDF(trans_id, customer_id, order_items_id) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);
  // Customize PDF Content
  page.drawText("Order Confirmation", {
    x: 50,
    y: 350,
    size: 20,
    color: rgb(0, 0, 0.8),
  });
  page.drawText(`Transaction ID: ${trans_id}`, { x: 50, y: 320 });
  page.drawText(`Customer ID: ${customer_id}`, { x: 50, y: 300 });
  page.drawText("Ordered Items:", { x: 50, y: 280 });

  let yPosition = 260;
  order_items_id.split(",").forEach((item, index) => {
    page.drawText(`${index + 1}. ${item}`, { x: 50, y: yPosition });
    yPosition -= 20;
  });

  page.drawText("Thank you for your purchase!", {
    x: 50,
    y: yPosition - 40,
    size: 16,
    color: rgb(0, 0.5, 0),
  });

  // Save the PDF
  const pdfBytes = await pdfDoc.save();

  // Convert PDF to Buffer
  const pdfBuffer = Buffer.from(pdfBytes);
  return pdfBuffer;
}
