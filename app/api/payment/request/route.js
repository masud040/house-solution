import { sslConfig } from "@/app/utils/sssConfig";
import connectMongo from "@/db/connectMongo";
import { PaymentModel } from "@/models/payment-model";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  try {
    const result = await sslConfig.init(body.data);

    if (!result.GatewayPageURL || result.status === "FAILED") {
      return NextResponse.json({ message: result.failedreason });
    } else if (result.status === "SUCCESS") {
      const paymentData = {
        paid: false,
        totalAmount: body.data.total_amount,
        name: body.data.cus_name,
        address: body.data.cus_add1,
        trans_id: body.data.tran_id,
        order_items_id: body.data.order_items_id,
      };
      await connectMongo();
      const res = await PaymentModel.create(paymentData);
      return NextResponse.json({ url: result.GatewayPageURL, status: 200 });
    }
  } catch (error) {
    return new NextResponse(JSON.stringify("Error: " + error));
  }
}
