import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await prisma.user.upsert({
    where: {
      email: "maneeshachennoju28@gmail.com",
    },
    update: {},
    create: {
      email: "maneeshachennoju28@gmail.com",
      name: "Maneesha",
    },
  });

  return NextResponse.json(user);
}