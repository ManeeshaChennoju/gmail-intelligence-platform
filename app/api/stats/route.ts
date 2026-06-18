import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const totalEmails = await prisma.email.count();

  const finance = await prisma.email.count({
    where: {
      category: "Finance",
    },
  });

  const security = await prisma.email.count({
    where: {
      category: "Security",
    },
  });

  const promotions = await prisma.email.count({
    where: {
      category: "Promotions",
    },
  });

  return NextResponse.json({
    totalEmails,
    finance,
    security,
    promotions,
  });
}