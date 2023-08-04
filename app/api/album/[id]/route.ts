import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
  id?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const { id } = params;
  const albulm = await prisma.albulm.findUnique({
    where: {
      id: id,
    },
    include: {
      images: true,
    },
  });

  return NextResponse.json(albulm);
}
