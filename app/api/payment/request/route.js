import { sslConfig } from "@/app/utils/sssConfig";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  try {
    const result = await sslConfig.init(body.data);
    console.log(body.data);
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
      // mongoDB.payment.create(newData)
      // Add new payment but ( paid: false )
      // if redirect to success route then change ( paid: true ) in success route
      return NextResponse.json({ url: result.GatewayPageURL, status: 200 });
    }
  } catch (error) {
    return new NextResponse(JSON.stringify("Error: " + error));
  }
}
