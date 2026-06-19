import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { emailId, prompt } = await req.json();

        const email = await prisma.email.findFirst({
            where: {
                OR: [
                    { id: emailId },
                    { gmailId: emailId },
                ],
            },
        });

        if (!email) {
            return NextResponse.json(
                {
                    error: "Email not found",
                },
                {
                    status: 404,
                }
            );
        }

        const category =
            email.category?.toLowerCase() || "";

        const userPrompt =
            prompt?.toLowerCase() || "";

        let reply = "";

        if (
            userPrompt.includes("more information")
        ) {
            reply = `
Hello,

Thank you for your email.

Could you please provide some additional information regarding this matter?

I look forward to your response.

Regards
`;
        } else if (
            userPrompt.includes("thank") ||
            userPrompt.includes("acknowledge")
        ) {
            reply = `
Hello,

Thank you for your email.

I appreciate the information provided and have reviewed the details.

Regards
`;
        } else if (
            category.includes("security")
        ) {
            reply = `
Hello,

Thank you for the security notification.

I have reviewed the account activity and noted the information provided.

Please let me know if any further action is required.

Regards
`;
        } else if (
            category.includes("finance")
        ) {
            reply = `
Hello,

Thank you for the financial update.

I have reviewed the information and will take the necessary action if required.

Regards
`;
        } else if (
            category.includes("promotion") ||
            category.includes("newsletter")
        ) {
            reply = `
Hello,

Thank you for sharing the information.

I appreciate the update and will review the details.

Regards
`;
        } else {
            reply = `
Hello,

Thank you for your email.

I have reviewed your message and will get back to you shortly.

Regards
`;
        }

        return NextResponse.json({
            success: true,
            subject: email.subject,
            sender: email.sender,
            category: email.category,
            reply,
        });

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to generate reply",
            },
            {
                status: 500,
            }
        );
    }
}