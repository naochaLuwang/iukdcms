import prisma from "@/app/libs/prismadb";

import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { verifyJwt } from "@/app/libs/jwt";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await request.json();

  const { title, order, thumbnailImage, status } = body;

  const orgsetting = await prisma.albulm.create({
    data: {
      title,
      order,
      thumbnailImage,
      status,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(orgsetting);
}

export async function GET(request: Request) {
  const album = await prisma.albulm.findMany({
    include: {
      images: true,
    },
  });

  return NextResponse.json(album);
}
