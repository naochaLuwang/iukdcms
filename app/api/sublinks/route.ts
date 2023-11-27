import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await request.json();

  const { title, slug, linkId, order, status, content, pageType, subtitle } =
    body;

  const newSublink = await prisma.sublinks.create({
    data: {
      title,
      subtitle,
      slug,
      order,
      linkId,
      status,
      content,
      pageType,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(newSublink);
}

export const revalidate = 1;

export async function GET(request: Request) {
  const menus = await prisma.sublinks.findMany({
    include: {
      user: true,

      link: true,
    },
  });

  return NextResponse.json(menus);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "ID cannot be empty" });
  }

  const deleteUser = await prisma.sublinks.delete({
    where: {
      id: id,
    },
  });
}
