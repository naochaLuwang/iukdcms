import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await request.json();

  const { name, sub, testimony, order, status, imageUrl } = body;

  const newTestimony = await prisma.testimonial.create({
    data: {
      name,
      sub,
      testimony,
      order,
      status,
      imageUrl,
    },
  });

  return NextResponse.json(newTestimony);
}

export async function GET(request: Request) {
  const testimonial = await prisma.testimonial.findMany({});

  return NextResponse.json(testimonial);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "ID cannot be empty" });
  }

  try {
    await prisma.testimonial.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json(
      { message: "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}
