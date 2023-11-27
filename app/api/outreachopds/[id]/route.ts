import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET(request: Request, { params }: { params: any }) {
  const { id } = params;
  const person = await prisma.outreachopds.findUnique({
    where: {
      id: id,
    },
  });

  return NextResponse.json(person);
}
