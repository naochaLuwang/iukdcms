import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
  id?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const { id } = params;
  const link = await prisma.links.findUnique({
    where: {
      id: id,
    },
  });

  return NextResponse.json(link);
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  const { id } = params;

  const body = await request.json();

  const { title, slug, order, status, content, pageType, isMulti } = body;

  if (!id || typeof id !== "string") {
    throw new Error("Invalid ID");
  }

  const editlink = await prisma.links.update({
    where: {
      id: id,
    },
    data: {
      title,
      slug,
      order,
      status,
      pageType,
      isMulti,
      content,
    },
  });

  return NextResponse.json(editlink);
}
