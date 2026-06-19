import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const emails = await prisma.email.findMany({
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