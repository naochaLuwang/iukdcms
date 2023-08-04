import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { title, slug, status } = body;

  const alerts = await prisma.alerts.create({
    data: {
      title,
      slug,

      status,
    },
  });

  return NextResponse.json(alerts);
}

export async function GET(request: Request) {
  const alerts = await prisma.alerts.findMany({
    where: {
      status: "ACTIVE",
    },
  });

  return NextResponse.json(alerts);
}
