import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
    const { question } = await req.json();

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