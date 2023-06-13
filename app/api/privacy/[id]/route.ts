import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  id?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const { id } = params;
  const privacy = await prisma.privacypolicies.findUnique({
    where: {
      id: id,
    },
  });

  return NextResponse.json(privacy);
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

  const editPrivacy = await prisma.privacypolicies.update({
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

  return NextResponse.json(editPrivacy);
}
