import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  try {
    const emails = await prisma.email.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
      select: {
        id: true,
        subject: true,
        sender: true,
        category: true,
      },
    });

    return NextResponse.json(emails);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch emails" },
      { status: 500 }
    );
  }
}