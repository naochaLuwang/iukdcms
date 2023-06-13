import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  id?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const { id } = params;
  const terms = await prisma.termsConditions.findUnique({
    where: {
      id: id,
    },
  });

  return NextResponse.json(terms);
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  const { id } = params;

  const body = await request.json();

  const { title, slug, content, status } = body;

  if (!id || typeof id !== "string") {
    throw new Error("Invalid ID");
  }

  const editTerms = await prisma.termsConditions.update({
    where: {
      id: id,
    },
    data: {
      title,
      slug,
      content,
      status,
    },
  });

  return NextResponse.json(editTerms);
}
