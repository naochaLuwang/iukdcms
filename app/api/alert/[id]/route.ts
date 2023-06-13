import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  id?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const { id } = params;

  const alerts = await prisma.alerts.findUnique({
    where: {
      id: id,
    },
  });

  return NextResponse.json(alerts);
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  const { id } = params;

  const body = await request.json();

  const { title, status, slug } = body;

  if (!id || typeof id !== "string") {
    throw new Error("Invalid ID");
  }

  const editAlert = await prisma.alerts.update({
    where: {
      id: id,
    },
    data: {
      title,
      status,
      slug,
    },
  });

  return NextResponse.json(editAlert);
}
