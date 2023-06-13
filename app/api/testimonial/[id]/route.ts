import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  id?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const { id } = params;
  const testimonial = await prisma.testimonial.findUnique({
    where: {
      id: id,
    },
  });

  return NextResponse.json(testimonial);
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  const { id } = params;

  const body = await request.json();

  const { name, sub, imageUrl, status, order, testimony } = body;

  if (!id || typeof id !== "string") {
    throw new Error("Invalid ID");
  }

  const edittestimonial = await prisma.testimonial.update({
    where: {
      id: id,
    },
    data: {
      name,
      sub,
      imageUrl,
      status,
      order,
      testimony,
    },
  });

  return NextResponse.json(edittestimonial);
}
