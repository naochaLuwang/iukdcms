import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { title, slug, status, content } = body;

  const privacy = await prisma.privacypolicies.create({
    data: {
      title,
      slug,

      status,

      content,
    },
  });

  return NextResponse.json(privacy);
}

export async function GET(request: Request) {
  const terms = await prisma.privacypolicies.findMany({
    where: {
      status: "ACTIVE",
    },
  });

  return NextResponse.json(terms);
}
