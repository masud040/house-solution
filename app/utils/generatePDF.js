import { getSuccessOrderedProducts } from "@/db/queries";
import { chromium } from "playwright";
export async function generatePDF({ trans_id, order_ids, user_name, user_id }) {
  const order_products = await getSuccessOrderedProducts({
    userId: user_id,
    order_ids: order_ids.split(","),
  });
  const productHTML = order_products
    .map((order) => {
      const totalPrice =
        (order.product_price -
          order.product_price * (order.product_discount / 100)) *
        order.quantity;

      return `<div style="border-bottom: 1px solid #ddd; padding: 10px 0;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <img
            src="${order.product_thumbnail}"
            alt="${order.product_name}"
            style="width: 100px; height: 60px; object-fit: cover; border-radius: 5px;"
          />
          <div>
            <p style="margin: 0; font-weight: bold;">${order.product_name}</p>
            <p style="margin: 0;">Price: $${Math.floor(totalPrice)}</p>
            <p style="margin: 0;">Quantity: ${order.quantity}</p>
            
          </div>
        </div>
      </div>
    `;
    })
    .join("");

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
        margin: 10px 0;
        padding: 10px 20px;
        font-size: 14px;
        font-weight: 600;
        color: #fff;
        background-color: #d81b60;
        text-decoration: none;
        border-radius: 5px;
        text-align: center;
      }
     
      .footer {
        margin-top: 20px;
        font-size: 14px;
        text-align: center;
        color: #777;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Sokher Corner</h1>
        <h3>Your Order Confirmation!</h3>
      </div>
      <p>Hi <strong>${user_name}</strong>,</p>
      <p>Your Order <strong>#${order_ids}</strong> has been successfully confirmed, and your transaction id is <strong>3${trans_id}</strong>.</p>
     
      <p>
        Your order is now being processed and will be shipped shortly. You can track your order's progress using the button below:
      </p>

<a href="https://sokher-corner.vercel.app/en/track-orders/${user_id}" class="button">Track Your Order</a>
      <div  style="  margin: 10px 0;">
        ${productHTML}
        </div>

      <p class="footer">Thank you for choosing Sokher Corner!</p>
    </div>
  </body>
  </html>

`;

  try {
    // Launch Puppeteer with Serverless Chromium
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "load" });
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
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
}
