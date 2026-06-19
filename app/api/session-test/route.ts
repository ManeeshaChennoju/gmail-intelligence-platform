import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {
    const session: any =
        await getServerSession(authOptions);
    console.log("SESSION:", session);

    return NextResponse.json({
        session,
    });
}