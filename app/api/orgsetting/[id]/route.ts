import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
  id?: string;
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  const { id } = params;

  const body = await request.json();
  console.log(id);

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

  if (!id || typeof id !== "string") {
    throw new Error("Invalid ID");
  }

  const setting = await prisma.orgsetting.findUnique({
    where: {
      id: id,
    },
  });

  const orgSet = await prisma.orgsetting.update({
    where: {
      id: id,
    },
    data: {
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
      userId: id,
      logoUrl: logoUrl || setting?.logoUrl,
    },
  });

  return NextResponse.json(orgSet);
}
