import { NextResponse } from "next/server";

export async function POST(req) {
  const searchParams = req.nextUrl.searchParams;

  // const trans_id = req.nextUrl.searchParams.get("trans_id")
  try {
    // const findPayment= await MongoDB.findOne({trans_id})
    // if(findPayment){
    //   await findOneAndUpdate.payment.updateOne({trans_id,{
    //     $set:{paid:true},
    //   }})
    // }
    const redirectUrl = new URL(`/en/about-us`, req.url);

    // Append the search parameters to the redirect URL
    searchParams.forEach((value, key) => {
      redirectUrl.searchParams.append(key, value);
    });

    return NextResponse.redirect(new URL(redirectUrl, req.url), 303);
  } catch (error) {
    return new NextResponse(JSON.stringify(error));
  }
}
