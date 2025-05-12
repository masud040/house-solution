import { NextResponse } from "next/server";

export async function GET(req) {
  const data = await req.json();

  return new NextResponse(JSON.stringify("GET: " + data));
}
export async function POST(req) {
  return new NextResponse(
    JSON.stringify({
      message: "Payment Failed",
    })
  );
}
