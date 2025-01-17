import { sslConfig } from "@/app/utils/sssConfig";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  try {
    const result = await sslConfig.init(body.data);

    if (!result.GatewayPageURL || result.status === "FAILED") {
      return NextResponse.json({ message: result.failedreason });
    } else if (result.status === "SUCCESS") {
      // const newData = {
      //   paid: false,
      //   totalAmount: 256,
      //   name: "Kajol",
      //   address: "Lalmoni",
      //   trans_id: transactionId,
      // };
      // mongoDB.payment.create(newData)
      // Add new payment but ( paid: false )
      // if redirect to success route then change ( paid: true ) in success route

      return NextResponse.json({ url: result.GatewayPageURL, status: 200 });
    }
  } catch (error) {
    return new NextResponse(JSON.stringify("Error: " + error));
  }
}
