import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

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
      totalEmails: 0,
      finance: 0,
      notifications: 0,
      newsletters: 0,
      jobs: 0,
    });
  }

  const totalEmails = await prisma.email.count({
    where: {
      userId: user.id,
    },
  });

  const finance = await prisma.email.count({
    where: {
      userId: user.id,
      category: "Finance",
    },
  });

  const notifications = await prisma.email.count({
    where: {
      userId: user.id,
      category: "Notifications",
    },
  });

  const newsletters = await prisma.email.count({
    where: {
      userId: user.id,
      category: "Newsletters",
    },
  });

  const jobs = await prisma.email.count({
    where: {
      userId: user.id,
      category: "Job / Recruitment",
    },
  });

  return NextResponse.json({
    totalEmails,
    finance,
    notifications,
    newsletters,
    jobs,
  });
}