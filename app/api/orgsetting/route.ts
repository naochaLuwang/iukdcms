import prisma from "@/app/libs/prismadb";

import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await request.json();

  const {
    name,
    phone,
    email,
    add1,
    add2,
    mtitle,
    description,
    facebook,
    linkedin,
    instagram,
    logoUrl,
  } = body;

  const orgsetting = await prisma.orgsetting.create({
    data: {
      name,
      userId: currentUser.id,
      phone,
      email,
      add1,
      add2,
      mtitle,
      description,
      facebook,
      linkedin,
      instagram,
      logoUrl: logoUrl,
    },
  });

  return NextResponse.json(orgsetting);
}

export async function GET(request: Request) {
  const orgsetting = await prisma.orgsetting.findMany({});

  return NextResponse.json(orgsetting);
}
