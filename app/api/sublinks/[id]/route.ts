import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  id?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const { id } = params;
  const sublink = await prisma.sublinks.findUnique({
    where: {
      id: id,
    },
  });

  return NextResponse.json(sublink);
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  const { id } = params;

  const body = await request.json();

  const { title, slug, order, status, content, pageType, linkId } = body;

  if (!id || typeof id !== "string") {
    throw new Error("Invalid ID");
  }

  const editsublink = await prisma.sublinks.update({
    where: {
      id: id,
    },
    data: {
      title,
      slug,
      order,
      linkId,
      status,
      content,
      pageType,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(editsublink);
}
