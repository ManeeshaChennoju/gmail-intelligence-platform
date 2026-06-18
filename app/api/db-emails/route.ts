import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const emails = await prisma.email.findMany({
    take: 20,
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(emails);
}