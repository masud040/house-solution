import { generatePDF } from "@/app/utils/generatePDF";
import { sendConfirmationMail } from "@/app/utils/sendConfirmationMail";
import connectMongo from "@/db/connectMongo";
import {
  deleteFromCartAndAddOrderSuccess,
  getUserByUserId,
} from "@/db/queries";
import { PaymentModel } from "@/models/payment-model";
import { NextResponse } from "next/server";

export async function POST(req) {
  const searchParams = req.nextUrl.searchParams;
  const trans_id = searchParams.get("trans_id");
  const customer_id = searchParams.get("cus_id");
  const order_items_id = searchParams.get("order_items_id");
  const order_id = searchParams.get("order_id");
  const user_name = searchParams.get("cus_name");
  try {
    await connectMongo();
    const findPayment = await PaymentModel.findOneAndUpdate(
      { trans_id },
      {
        paid: true,
      },
      {
        new: true,
      }
    );

    if (findPayment?.paid) {
      // Generate PDF
      const pdfBuffer = await generatePDF({
        trans_id,
        order_id,
        user_name,
        order_items_id,
        customer_id,
      });

      const user = await getUserByUserId(customer_id);

      await sendConfirmationMail({ pdfBuffer, toEmail: user.email, order_id });

      const res = await deleteFromCartAndAddOrderSuccess({
        order_items_id: order_items_id.split(","),
        customer_id,
        order_id,
      });

      if (res.success) {
        const response = NextResponse.redirect(
          new URL(
            `/en/payment/success?trans_id=${trans_id}&order_id=${order_id}&cus_name=${user_name}`,
            req.url
          ),
          303
        );
        response.headers.set("Cache-Control", "no-store");
        return response;
      }
    }
  } catch (error) {
    return new NextResponse(JSON.stringify(error));
  }
}
