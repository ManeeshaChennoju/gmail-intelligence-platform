import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY!
);

function generateFallbackTemplate(prompt: string) {
    const text = prompt.toLowerCase();

    if (text.includes("meeting")) {
        return `
Subject: Meeting Request

Hello,

Thank you for reaching out.

I am available for the meeting and look forward to discussing the details.

Please share a suitable time and agenda.

Best Regards
`;
    }

    if (text.includes("follow")) {
        return `
Subject: Follow Up

Hello,

I wanted to follow up regarding our previous discussion.

Please let me know if there are any updates or actions required from my side.

Best Regards
`;
    }

    if (text.includes("leave")) {
        return `
Subject: Leave Request

Hello,

I would like to request leave due to personal reasons.

Please consider my request and let me know if any additional information is needed.

Thank you.

Best Regards
`;
    }

    return `
Subject: Professional Email

Hello,

Thank you for your message.

I appreciate your communication and will review the details shortly.

Best Regards
`;
}

export async function POST(req: NextRequest) {
    const { prompt } = await req.json();
    try {
        if (!prompt) {
            return NextResponse.json(
                { error: "Prompt is required" },
                { status: 400 }
            );
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
        });

        const result = await model.generateContent(`
Write a professional email.

User Request:
${prompt}

Return only the email body.
`);

        const emailDraft = result.response.text();

        return NextResponse.json({
            success: true,
            draft: emailDraft,
        });
    }
    catch (error) {
        console.error("Gemini failed. Using fallback template.");

        return NextResponse.json({
            success: true,
            draft: generateFallbackTemplate(prompt),
            source: "fallback",
        });
    }
}