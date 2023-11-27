import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await request.json();

  const { title, slug, order, status, pageType, content, isMulti } = body;

  const menu = await prisma.links.create({
    data: {
      title,
      slug,
      order,
      status,
      pageType,
      isMulti,
      userId: currentUser.id,
      content,
    },
  });

  return NextResponse.json(menu);
}

export const revalidate = 1;

export async function GET(request: Request) {
  const menus = await prisma.links.findMany({
    where: {
      status: "ACTIVE",
    },
    include: {
      sublinks: true,

      user: true,
    },
  });

  return NextResponse.json(menus);
}
