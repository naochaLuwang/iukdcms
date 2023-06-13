import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  id?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const { id } = params;

  const menu = await prisma.department.findUnique({
    where: {
      id: id,
    },
  });

  return NextResponse.json(menu);
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  const { id } = params;
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { departmentName, order, status, departmentCode } = body;

  if (!id || typeof id !== "string") {
    throw new Error("Invalid ID");
  }

  const editDepartment = await prisma.department.update({
    where: {
      id: id,
    },
    data: {
      departmentName,
      departmentCode,
      order,
      status,
      createdBy: currentUser.name || "",
      updatedBy: currentUser.name || "",
    },
  });

  return NextResponse.json(editDepartment);
}
