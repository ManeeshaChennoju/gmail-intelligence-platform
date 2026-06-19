import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const session: any =
            await getServerSession(authOptions);

        if (!session?.accessToken) {
            return NextResponse.json(
                {
                    error: "No access token",
                },
                {
                    status: 401,
                }
            );
        }

        const { to, subject, body } =
            await req.json();

        const oauth2Client =
            new google.auth.OAuth2();

        oauth2Client.setCredentials({
            access_token:
                session.accessToken,
        });

        const gmail = google.gmail({
            version: "v1",
            auth: oauth2Client,
        });

        const emailLines = [
            `To: ${to}`,
            `Subject: ${subject}`,
            "Content-Type: text/plain; charset=utf-8",
            "",
            body,
        ];

        const email =
            emailLines.join("\n");

        const encodedMessage =
            Buffer.from(email)
                .toString("base64")
                .replace(/\+/g, "-")
                .replace(/\//g, "_")
                .replace(/=+$/, "");

        const result =
            await gmail.users.messages.send({
                userId: "me",
                requestBody: {
                    raw: encodedMessage,
                },
            });

        return NextResponse.json({
            success: true,
            messageId: result.data.id,
        });

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to send email",
            },
            {
                status: 500,
            }
        );
    }
}