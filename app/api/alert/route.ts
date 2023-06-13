import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

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

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "ID cannot be empty" });
  }

  const deleteUser = await prisma.alerts.delete({
    where: {
      id: id,
    },
  });
}
