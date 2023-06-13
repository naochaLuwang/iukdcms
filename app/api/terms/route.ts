import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { title, slug, status, content } = body;

  const terms = await prisma.termsConditions.create({
    data: {
      title,
      slug,

      status,

      content,
    },
  });

  return NextResponse.json(terms);
}

export async function GET(request: Request) {
  const terms = await prisma.termsConditions.findMany({
    where: {
      status: "ACTIVE",
    },
  });

  return NextResponse.json(terms);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "ID cannot be empty" });
  }

  const deleteUser = await prisma.termsConditions.delete({
    where: {
      id: id,
    },
  });
}
