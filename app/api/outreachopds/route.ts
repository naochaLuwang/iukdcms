import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { data } from "autoprefixer";
import { Opdlists } from "@prisma/client";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await request.json();

  console.log(body);

  const { date, doctor, opdlists } = body;

  const people = await prisma.outreachopds.create({
    data: {
      date,
      doctorId: doctor,
      opdLists: {
        create: opdlists,
      },
    },
  });

  console.log(people);

  return NextResponse.json(people);
}

export async function GET(request: Request) {
  const peoples = await prisma.outreachopds.findMany({
    include: {
      opdLists: true,
    },
  });

  return NextResponse.json(peoples);
}
