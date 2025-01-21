import { NextResponse } from "next/server";

export async function GET(req) {
  // return NextResponse.json({
  //   message: "Payment Cenceled",
  // });
  return NextResponse.redirect("/about-us");
}
