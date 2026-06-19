import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

function getCategory(
  subject: string,
  content: string,
  sender: string = ""
) {
  const text =
    `${subject} ${content} ${sender}`.toLowerCase();

  // Finance
  if (
    text.includes("bank") ||
    text.includes("loan") ||
    text.includes("credit") ||
    text.includes("payment") ||
    text.includes("invoice") ||
    text.includes("receipt") ||
    text.includes("transaction") ||
    text.includes("kotak") ||
    text.includes("hdfc") ||
    text.includes("icici")
  ) {
    return "Finance";
  }

  // Job / Recruitment
  if (
    text.includes("job") ||
    text.includes("career") ||
    text.includes("recruiter") ||
    text.includes("recruitment") ||
    text.includes("interview") ||
    text.includes("application") ||
    text.includes("resume") ||
    text.includes("hiring") ||
    text.includes("offer letter")
  ) {
    return "Job / Recruitment";
  }

  // Newsletters
  if (
    text.includes("newsletter") ||
    text.includes("digest") ||
    text.includes("subscription") ||
    text.includes("weekly update") ||
    text.includes("daily update")
  ) {
    return "Newsletters";
  }

  // Notifications
  if (
    text.includes("security") ||
    text.includes("password") ||
    text.includes("otp") ||
    text.includes("verification") ||
    text.includes("account") ||
    text.includes("login") ||
    text.includes("alert") ||
    text.includes("notification")
  ) {
    return "Notifications";
  }

  // Work / Professional
  if (
    text.includes("meeting") ||
    text.includes("project") ||
    text.includes("team") ||
    text.includes("client") ||
    text.includes("work") ||
    text.includes("sprint") ||
    text.includes("deadline") ||
    text.includes("task") ||
    text.includes("jira")
  ) {
    return "Work / Professional";
  }

  // Default
  return "Personal";
}

export async function GET() {
  const emails = await prisma.email.findMany();

  for (const email of emails) {
    try {
      const summary =
        email.snippet?.substring(0, 150) || "";

      const category = getCategory(
        email.subject || "",
        email.snippet || "",
        email.sender || ""
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