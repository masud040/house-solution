import nodemailer from "nodemailer";
export async function sendConfirmationMail({ pdfBuffer, toEmail, order_id }) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USERNAME,
      to: toEmail,

      subject: "Order Confirmation",
      text: `<p>Your order has been confirmed. Please find your order confirmation attached as a PDF.</p>`,
      attachments: [
        {
          filename: "order_confirmation.pdf", // Name of the file
          content: pdfBuffer,
          encoding: "base64",
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    // Return an error if something goes wrong
    throw new Error({ message: "Error sending email", error });
  }
}
