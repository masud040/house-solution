import connectMongo from "@/db/connectMongo";
import { UserModel } from "@/models/users-model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
export async function POST(request) {
  const { name, email, password } = await request.json();

  await connectMongo();
  const hashPassword = await bcrypt.hash(password, 5);
  const newUser = {
    name: name,
    email: email,
    password: hashPassword,
  };

  try {
    const foundUser = await UserModel.findOne({ email: email });

    if (foundUser?.email) {
      return NextResponse.json({
        message: "This user already exists. Please login!",
        status: 400,
      });
    } else {
      await UserModel.create(newUser);
      return NextResponse.json({
        message: "User has been created",
        status: 201,
      });
    }
  } catch (err) {
    return NextResponse.json(err.message, { status: 500 });
  }
}
