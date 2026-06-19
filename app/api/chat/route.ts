import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { question } = await req.json();

    // const emails = await prisma.email.findMany({
    //     orderBy: {
    //         createdAt: "desc",
    //     },
    //     // take: 20,
    //     take: 50,
    // });
    const emails = await prisma.email.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    const q = question.toLowerCase();

    let result = emails;

    if (q.includes("finance")) {
        result = emails.filter(
            (e) => e.category === "Finance"
        );
    }
    else if (
        q.includes("notification") ||
        q.includes("notifications")
    ) {
        result = emails.filter(
            (e) => e.category === "Notifications"
        );
    }
    else if (
        q.includes("newsletter") ||
        q.includes("newsletters")
    ) {
        result = emails.filter(
            (e) => e.category === "Newsletters"
        );
    }
    else if (
        q.includes("job") ||
        q.includes("recruitment") ||
        q.includes("career")
    ) {
        result = emails.filter(
            (e) =>
                e.category ===
                "Job / Recruitment"
        );
    }
    else if (
        q.includes("work") ||
        q.includes("professional")
    ) {
        result = emails.filter(
            (e) =>
                e.category ===
                "Work / Professional"
        );
    }
    else if (
        q.includes("personal")
    ) {
        result = emails.filter(
            (e) => e.category === "Personal"
        );
    }

    return NextResponse.json({
        answer: result.map((email) => ({
            subject: email.subject,
            sender: email.sender,
            category: email.category,
            summary: email.summary,
            gmailId: email.gmailId,
        })),
    });
}