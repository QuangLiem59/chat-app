import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "../../../libs/prismadb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    if (!name || !email || !password) {
      return new NextResponse("Missing required info", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log("Register Fail!", error);
    throw new NextResponse("Register error!", { status: 500 });
  }
}
