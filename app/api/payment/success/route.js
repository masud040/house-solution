import { NextResponse } from "next/server";

export async function POST(req) {
  // const trans_id = req.nextUrl.searchParams.get("trans_id")
  try {
    // const findPayment= await MongoDB.findOne({trans_id})
    // if(findPayment){
    //   await findOneAndUpdate.payment.updateOne({trans_id,{
    //     $set:{paid:true},
    //   }})
    // }

    return new NextResponse(
      JSON.stringify({
        message: "Payment Successfully",
      })
    );
  } catch (error) {
    return new NextResponse(JSON.stringify(error));
  }
}
