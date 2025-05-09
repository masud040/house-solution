import { generatePDF } from "@/app/utils/generatePDF";
import { sendConfirmationMail } from "@/app/utils/sendConfirmationMail";
import connectMongo from "@/db/connectMongo";
import { getUserByUserId } from "@/db/queries";
import { OrdersModel } from "@/models/orders-model";

import { PaymentModel } from "@/models/payment-model";
import { NextResponse } from "next/server";

export async function POST(req) {
  const searchParams = req.nextUrl.searchParams;

  const trans_id = searchParams.get("trans_id");
  const customer_id = searchParams.get("cus_id");
  const order_ids = searchParams.get("order_ids");
  const user_name = searchParams.get("cus_name");
  try {
    await connectMongo();
    const findPayment = await PaymentModel.findOneAndUpdate(
      { trans_id },
      {
        $set: { paid: true },
      },
      {
        new: true,
      }
    );

    if (findPayment?.paid) {
      const orderIdArray = order_ids.split(",");
      // Update orders status to "shipped" and mark as ongoing_status as "to-ship"
      const res = await OrdersModel.updateMany(
        {
          userId: customer_id,
          orderId: { $in: orderIdArray },
          ongoing_status: "to-pay",
          status: "processing",
        },
        {
          $set: { ongoing_status: "seller-to-pack", status: "seller to pack" },
        }, // Update fields
        { new: true }
      );

      if (res.modifiedCount > 0) {
        const user = await getUserByUserId(customer_id);

        // Generate PDF
        const pdfBuffer = await generatePDF({
          trans_id,
          order_ids,
          user_name,
          user_id: customer_id,
        });

        await sendConfirmationMail({
          pdfBuffer,
          toEmail: user.email,
        });

        const response = NextResponse.redirect(
          new URL(
            `/en/payment/success?trans_id=${trans_id}&order_ids=${order_ids}&cus_name=${user_name}&user_id=${customer_id}`,
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
