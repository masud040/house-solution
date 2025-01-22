import { generatePDF } from "@/app/utils/generatePDF";
import connectMongo from "@/db/connectMongo";
import { deleteCartItemsAfterOrderSuccess } from "@/db/queries";
import { PaymentModel } from "@/models/payment-model";
import { NextResponse } from "next/server";

export async function POST(req) {
  const searchParams = req.nextUrl.searchParams;
  const trans_id = searchParams.get("trans_id");
  const customer_id = searchParams.get("cus_id");
  const order_items_id = searchParams.get("order_items_id");

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
      const pdfBuffer = await generatePDF(
        trans_id,
        customer_id,
        order_items_id
      );
      console.log(pdfBuffer);

      const res = await deleteCartItemsAfterOrderSuccess(
        order_items_id.split(","),
        customer_id
      );
      if (res.success) {
        return NextResponse.redirect(
          new URL(`/en/payment/success${req.nextUrl.search}`, req.url),
          303
        );
      }
    }
  } catch (error) {
    return new NextResponse(JSON.stringify(error));
  }
}
