import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { name, image } = body;

    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    if (!name && !image) {
      return new NextResponse("Missing required info", { status: 400 });
    }

    const updateUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name: name,
        image: image,
      },
    });

    return NextResponse.json(updateUser);
  } catch (error) {
    throw new NextResponse("Internal Error!", { status: 500 });
  }
}
