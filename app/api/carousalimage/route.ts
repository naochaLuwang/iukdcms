import prisma from "@/app/libs/prismadb";

import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await request.json();

  const { title, order, imgUrl, status } = body;

  const orgsetting = await prisma.carousalimage.create({
    data: {
      title,
      order,
      imgUrl,
      status,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(orgsetting);
}

export async function GET(request: Request) {
  const orgsetting = await prisma.carousalimage.findMany({
    include: {
      user: true,
    },
  });

  return NextResponse.json(orgsetting);
}
