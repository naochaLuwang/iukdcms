import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
  id?: string;
}

export const revalidate = 1;

export async function GET(request: Request, { params }: { params: IParams }) {
  const { id } = params;
  const person = await prisma.people.findUnique({
    where: {
      id: id,
    },
  });

  return NextResponse.json(person);
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  const { id } = params;

  const body = await request.json();

  const {
    salutation,
    firstName,
    lastName,
    slug,
    email,
    phone,
    address,
    qualification,
    designation,
    opdTiming,
    opdDays,
    showEmail,
    showPhone,
    departmentId,

    bio,
    order,
    profileUrl,
    status,
  } = body;

  if (!id || typeof id !== "string") {
    throw new Error("Invalid ID");
  }

  const editpeople = await prisma.people.update({
    where: {
      id: id,
    },
    data: {
      salutation,
      firstName,
      lastName,
      slug,
      email,
      phone,
      address,
      qualification,
      designation,
      opdTiming,
      opdDays,
      showEmail,
      showPhone,
      departmentId,

      bio,
      order,
      profileUrl,
      status,
    },
  });

  return NextResponse.json(editpeople);
}
