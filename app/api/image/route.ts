import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await request.json();

  //   const { images } = body;
  //   console.log(images);

  console.log(body);

  const images = await prisma.images.createMany({
    data: body,
  });

  return NextResponse.json(images);
}
