import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    return NextResponse.json({ status: "success" });
  } catch (error) {
    return new NextResponse(JSON.stringify("Error: " + error));
  }
}
