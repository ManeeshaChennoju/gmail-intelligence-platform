import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    return NextResponse.json({
      answer: [],
    });
  }
  const emails = await prisma.email.findMany({
    where: {
      userId: user.id,
    },
    take: 100,
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(emails);
}