import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { question } = await req.json();

    const emails = await prisma.email.findMany({
        orderBy: {
            createdAt: "desc",
        },
        take: 20,
    });

    const q = question.toLowerCase();

    let result = emails;

    if (q.includes("finance")) {
        result = emails.filter(
            (e) => e.category === "Finance"
        );
    } else if (q.includes("security")) {
        result = emails.filter(
            (e) => e.category === "Security"
        );
    } else if (q.includes("promotion")) {
        result = emails.filter(
            (e) => e.category === "Promotions"
        );
    }

    return NextResponse.json({
        answer: result.map((email) => ({
            subject: email.subject,
            category: email.category,
            summary: email.summary,
        })),
    });
}