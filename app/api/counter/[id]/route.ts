import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  id?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const { id } = params;

  const counters = await prisma.counters.findUnique({
    where: {
      id: id,
    },
  });

  return NextResponse.json(counters);
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  const { id } = params;

  const body = await request.json();

  const { title, value, status, order } = body;

  if (!id || typeof id !== "string") {
    throw new Error("Invalid ID");
  }

  const editCounter = await prisma.counters.update({
    where: {
      id: id,
    },
    data: {
      title,
      value,
      order,
      status,
    },
  });

  return NextResponse.json(editCounter);
}
