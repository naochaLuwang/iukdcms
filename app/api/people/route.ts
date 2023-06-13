import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
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

  const people = await prisma.people.create({
    data: {
      salutation,
      firstName,
      lastName,
      address,
      opdTiming,
      opdDays,
      qualification,
      designation,
      slug,
      email,
      phone,
      showEmail,
      showPhone,
      departmentId,
      bio,
      order,
      profileUrl,
      status,
      createdBy: currentUser.name || "",
      updatedBy: currentUser.name || "",
    },
  });

  return NextResponse.json(people);
}

export async function GET(request: Request) {
  const peoples = await prisma.people.findMany({
    where: {
      status: "ACTIVE",
    },
    include: {
      department: true,
    },
  });

  return NextResponse.json(peoples);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "ID cannot be empty" });
  }

  const deleteUser = await prisma.people.delete({
    where: {
      id: id,
    },
  });
}
