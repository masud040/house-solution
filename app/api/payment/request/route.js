import { sslConfig } from "@/app/utils/sssConfig";
import connectMongo from "@/db/connectMongo";
import { deleteFromCartAndAddOrderSuccess } from "@/db/queries";
import { PaymentModel } from "@/models/payment-model";
import { NextResponse } from "next/server";
export async function POST(req) {
  const { data } = await req.json();

  try {
    const result = await sslConfig.init(data);

    if (!result.GatewayPageURL || result.status === "FAILED") {
      return NextResponse.json({ message: result.failedreason });
    } else if (result.status === "SUCCESS") {
      const paymentData = {
        paid: false,
        totalAmount: data.total_amount,
        name: data.cus_name,
        address: data.cus_add1,
        trans_id: data.tran_id,
        order_items_id: data.order_items_id,
        cus_id: data.cus_id,
        order_id: data.order_id,
      };

      await connectMongo();
      await PaymentModel.create(paymentData);

      await deleteFromCartAndAddOrderSuccess({
        order_items_id: data.order_items_id,
        customer_id: data.cus_id,
        order_id: data.order_id,
      });

      return NextResponse.json({ url: result.GatewayPageURL, status: 200 });
    }
  } catch (error) {
    return new NextResponse(JSON.stringify("Error: " + error));
  }
}
