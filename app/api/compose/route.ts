import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY!
);


export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();

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
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to generate email",
            },
            {
                status: 500,
            }
        );
    }
}