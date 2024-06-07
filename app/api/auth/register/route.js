import connectMongo from "@/db/connectMongo";
import { UserModel } from "@/models/user-model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
export async function POST(request) {
  const { fName, lName, email, password } = await request.json();

  await connectMongo();
  const hashPassword = await bcrypt.hash(password, 5);
  const newUser = {
    name: `${fName} ${lName}`,
    email: email,
    password: hashPassword,
  };
  try {
    await UserModel.create(newUser);
    return new NextResponse("User has been created", { status: 201 });
  } catch (err) {
    return new NextResponse(err.message, { status: 500 });
  }
}
