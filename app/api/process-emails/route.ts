import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

function getCategory(subject: string, content: string) {
  const text = `${subject} ${content}`.toLowerCase();

  if (
    text.includes("bank") ||
    text.includes("loan") ||
    text.includes("credit") ||
    text.includes("payment") ||
    text.includes("kotak")
  ) {
    return "Finance";
  }

  if (
    text.includes("password") ||
    text.includes("security") ||
    text.includes("account") ||
    text.includes("login") ||
    text.includes("google account")
  ) {
    return "Security";
  }

  if (
    text.includes("job") ||
    text.includes("interview") ||
    text.includes("career")
  ) {
    return "Job";
  }

  if (
    text.includes("sale") ||
    text.includes("discount") ||
    text.includes("offer") ||
    text.includes("promotion")
  ) {
    return "Promotions";
  }

  if (
    text.includes("newsletter") ||
    text.includes("update")
  ) {
    return "Newsletter";
  }

  return "Other";
}

export async function GET() {
  const emails = await prisma.email.findMany({
    take: 10,
  });

  for (const email of emails) {
    try {
      const summary =
        email.snippet?.substring(0, 150) || "";

      const category = getCategory(
        email.subject || "",
        email.snippet || ""
      );

      await prisma.email.update({
        where: {
          id: email.id,
        },
        data: {
          summary,
          category,
        },
      });

      console.log(
        `Processed: ${email.subject} -> ${category}`
      );
    } catch (error) {
      console.error(
        `Failed processing email ${email.id}`,
        error
      );
    }
  }

  return NextResponse.json({
    success: true,
    processed: emails.length,
  });
}