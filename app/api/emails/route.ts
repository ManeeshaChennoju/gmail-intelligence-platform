import { prisma } from "@/app/lib/prisma";
import { google } from "googleapis";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token?.accessToken) {
    return NextResponse.json(
      { error: "No access token found" },
      { status: 401 }
    );
  }

  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 401 }
    );
  }

  const user = await prisma.user.upsert({
    where: {
      email: session.user.email,
    },
    update: {},
    create: {
      email: session.user.email,
      name: session.user.name || "",
    },
  });

  const oauth2Client = new google.auth.OAuth2();

  oauth2Client.setCredentials({
    access_token: token.accessToken as string,
  });

  const gmail = google.gmail({
    version: "v1",
    auth: oauth2Client,
  });

  const listResponse = await gmail.users.messages.list({
    userId: "me",
    maxResults: 100,
    labelIds: ["INBOX"],
  });

  const messages = listResponse.data.messages || [];

  const emailDetails = await Promise.all(
    messages.map(async (msg) => {
      if (!msg.id) return null;

      const email = await gmail.users.messages.get({
        userId: "me",
        id: msg.id,
      });

      const headers = email.data.payload?.headers || [];

      const subject =
        headers.find((h) => h.name === "Subject")?.value || "";

      const from =
        headers.find((h) => h.name === "From")?.value || "";

      const date =
        headers.find((h) => h.name === "Date")?.value || "";

      await prisma.email.upsert({
        where: {
          gmailId: msg.id,
        },
        update: {
          subject,
          sender: from,
          snippet: email.data.snippet || "",
          body: email.data.snippet || "",
        },
        create: {
          gmailId: msg.id,
          threadId: email.data.threadId || "",
          subject,
          sender: from,
          snippet: email.data.snippet || "",
          body: email.data.snippet || "",
          userId: user.id,
        },
      });

      return {
        id: msg.id,
        threadId: email.data.threadId || "",
        subject,
        from,
        date,
        snippet: email.data.snippet || "",
      };
    })
  );

  return NextResponse.json(
    emailDetails.filter(Boolean)
  );
}