import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { title, value, order, status } = body;

  const counters = await prisma.counters.create({
    data: {
      title,
      value,
      order,
      status,
    },
  });

  return NextResponse.json(counters);
}
