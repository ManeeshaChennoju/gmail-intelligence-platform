import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
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
        orderBy: {
            createdAt: "desc",
        },
    });

    const threadMap = new Map();

    for (const email of emails) {
        const threadId = email.threadId;

        if (!threadMap.has(threadId)) {
            threadMap.set(threadId, {
                threadId,
                count: 0,
                latestSubject: email.subject,
                latestSender: email.sender,
            });
        }

        threadMap.get(threadId).count++;
    }

    return NextResponse.json(
        Array.from(threadMap.values()),

    );
}