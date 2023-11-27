import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await request.json();

  const { departmentName, order, status, departmentCode } = body;

  const department = await prisma.department.create({
    data: {
      departmentName,
      departmentCode,
      order,
      status,
      createdBy: currentUser.name || "",
      updatedBy: currentUser.name || "",
    },
  });

  return NextResponse.json(department);
}

export async function GET(request: Request) {
  const departments = await prisma.department.findMany({
    where: {
      status: "ACTIVE",
    },
  });

  return NextResponse.json(departments);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "ID cannot be empty" });
  }

  const deleteUser = await prisma.department.delete({
    where: {
      id: id,
    },
  });
}
