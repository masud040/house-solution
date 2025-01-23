import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function generatePDF({ trans_id, order_id, user_name }) {
  const pdfDoc = await PDFDocument.create();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const timesBoldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const page = pdfDoc.addPage([400, 400]);

  const pageWidth = page.getWidth();
  const pageHeight = page.getHeight();

  const companyName = "Sokher Corner";
  const companyNameWidth = timesRomanFont.widthOfTextAtSize(companyName, 16);
  page.drawText(companyName, {
    x: (pageWidth - companyNameWidth) / 2,
    y: pageHeight - 40,
    size: 16,
    font: timesRomanFont,
    color: rgb(0, 0, 0.8),
  });

  // Title
  const title = "Your order has been confirmed!";
  const titleWidth = timesRomanFont.widthOfTextAtSize(title, 10);
  page.drawText(title, {
    x: (pageWidth - titleWidth) / 2,
    y: pageHeight - 70,
    size: 9,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  // Content Message
  const message = `Hi ${user_name},\n\nYour Order #${order_id} has been successfully confirmed, and your Transaction ID is #${trans_id}.\n\nYour order is now being processed and will be shipped shortly. You can track the progress of your order on our website.\n\nThank you for choosing ${companyName}!`;

  const fontSize = 8;
  const lineHeight = 10;
  const marginX = 40; // Left and right margins
  const textWidth = pageWidth - marginX * 2;
  const startY = pageHeight - 90;

  let yPosition = startY;

  // Split the message into paragraphs
  const paragraphs = message.split("\n\n");

  paragraphs.forEach((paragraph) => {
    const lines = wrapText(paragraph, timesRomanFont, fontSize, textWidth);

    lines.forEach((line) => {
      if (yPosition < 40) return; // Avoid writing too close to the bottom

      // Draw regular text part
      page.drawText(line, {
        x: marginX,
        y: yPosition,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      yPosition -= lineHeight;
    });

    yPosition -= lineHeight; // Extra spacing between paragraphs
  });
  // Add Tracking Button
  const buttonText = "Track Your Order";
  const buttonFontSize = 8;
  const buttonTextWidth = timesRomanFont.widthOfTextAtSize(
    buttonText,
    buttonFontSize
  );
  const buttonPadding = 27;
  const buttonWidth = buttonTextWidth + buttonPadding;
  const buttonHeight = 20;
  const buttonX = (pageWidth - buttonWidth) / 2;
  const buttonY = yPosition - buttonHeight - 10;
  // Draw the button background (with a rounded corner for a more modern look)
  page.drawRectangle({
    x: buttonX,
    y: buttonY,
    width: buttonWidth,
    height: buttonHeight,
    color: rgb(1, 0.004, 0.31), // Button background color
    radius: 5,
  });

  const buttonTextX = buttonX + (buttonWidth - buttonTextWidth) / 2;
  const buttonTextY = buttonY + (buttonHeight - buttonFontSize) / 2 + 2; // Vertically center the text

  page.drawText(buttonText, {
    x: buttonTextX,
    y: buttonTextY,
    size: buttonFontSize,
    font: timesBoldFont,
    color: rgb(1, 1, 1), // Button text color (white)
  });

  // Save PDF
  const pdfBytes = await pdfDoc.save();
  const pdfBuffer = Buffer.from(pdfBytes);
  return pdfBuffer;
}

// Utility Function: Wrap text into lines that fit within the specified width
function wrapText(text, font, fontSize, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let currentLine = "";

  words.forEach((word) => {
    const testLine = currentLine + word + " ";
    const testWidth = font.widthOfTextAtSize(testLine, fontSize);

    if (testWidth > maxWidth) {
      lines.push(currentLine.trim());
      currentLine = word + " ";
    } else {
      currentLine = testLine;
    }
  });

  if (currentLine.trim()) {
    lines.push(currentLine.trim());
  }

  return lines;
}
