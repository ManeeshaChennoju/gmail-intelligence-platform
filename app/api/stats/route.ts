import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const totalEmails = await prisma.email.count();

  const finance = await prisma.email.count({
    where: {
      category: "Finance",
    },
  });

  const notifications = await prisma.email.count({
    where: {
      category: "Notifications",
    },
  });

  const newsletters = await prisma.email.count({
    where: {
      category: "Newsletters",
    },
  });

  const jobs = await prisma.email.count({
    where: {
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