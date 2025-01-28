import connectMongo from "@/db/connectMongo";
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
      // Update orders status to "shipped" and mark as ongoing_status as "to-ship"
      console.log("Order_ids", order_ids);
      const res = await OrdersModel.updateMany(
        { userId: customer_id, orderId: { $in: order_ids.split(",") } },
        { $set: { ongoing_status: "to-ship", status: "shipped" } }, // Update fields
        { new: true }
      );
      console.log(res);
      // if (res.ongoing_status == "to-ship") {
      //   const user = await getUserByUserId(customer_id);

      //   // Generate PDF
      //   const pdfBuffer = await generatePDF({
      //     trans_id,
      //     order_ids,
      //     user_name,
      //     user_id: customer_id,
      //   });

      //   await sendConfirmationMail({
      //     pdfBuffer,
      //     toEmail: user.email,
      //     order_ids,
      //   });
      //   const response = NextResponse.redirect(
      //     new URL(
      //       `/en/payment/success?trans_id=${trans_id}&order_ids=${order_ids}&cus_name=${user_name}&user_id=${customer_id}`,
      //       req.url
      //     ),
      //     303
      //   );
      //   response.headers.set("Cache-Control", "no-store");
      //   return response;
      // }
    }
  } catch (error) {
    return new NextResponse(JSON.stringify(error));
  }
}
