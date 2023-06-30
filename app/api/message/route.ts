import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const messages = await prisma.message.findMany({});

  return NextResponse.json(messages);
}
