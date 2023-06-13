import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const user = await prisma.user.findMany();

  return NextResponse.json(user);
}
