import puppeteer from "puppeteer";

export async function generatePDF({
  trans_id,
  order_id,
  user_name,
  order_items_id,
}) {
  const htmlContent = `
 <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        padding: 20px;

        color: #333;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        
      }
      .header {
        text-align: center;
        font-size: 16px;
        
        
      }
      .header h1 {
        font-weight: 700;
        color: transparent;
        font-size: 32px;
        background-image: linear-gradient(to right, #cc013f, #6b21a8);
        background-clip: text;
        background-clip: text;
      }
      .header h3{
      margin: 0;
      }

      .button {
        display: inline-block;
        margin-top: 20px;
        padding: 10px 20px;
        font-size: 14px;
        color: #fff;
        background-color: #d81b60;
        text-decoration: none;
        border-radius: 5px;
        text-align: center;
      }
      .footer {
        margin-top: 20px;
        font-size: 12px;
        text-align: center;
        color: #777;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Sokher Corner</h1>
        <h3>Your Order Confirmation</h3>
      </div>
      <p>Hi <strong>${user_name}</strong>,</p>
      <p>Your Order <strong>#${order_id}</strong> has been successfully confirmed, and your transaction id is <strong>3${trans_id}</strong>.</p>
     
      <p>
        Your order is now being processed and will be shipped shortly. You can track your order's progress using the button below:
      </p>
      <a href="https://example.com/track-order/${order_id}" class="button">Track Your Order</a>
      <p class="footer">Thank you for choosing Sokher Corner!</p>
    </div>
  </body>
  </html>
`;
  // Launch Puppeteer and generate the PDF
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set the HTML content
  await page.setContent(htmlContent, { waitUntil: "load" });

  // Generate the PDF
  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "20px",
      bottom: "20px",
      left: "20px",
      right: "20px",
    },
  });

  await browser.close();

  return pdfBuffer;
}
