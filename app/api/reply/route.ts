// import { prisma } from "@/app/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//     const { emailId, prompt } = await req.json();

//     const email = await prisma.email.findUnique({
//         where: {
//             id: emailId,
//         },
//     });

//     if (!email) {
//         return NextResponse.json({
//             error: "Email not found",
//         });
//     }

//     const reply = `
// Hi,

// Regarding your email:

// Subject:
// ${email.subject}

// Summary:
// ${email.summary}

// Response:
// ${prompt}

// Thank you.

// Best Regards
// `;

//     return NextResponse.json({
//         reply,
//     });
// }

import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { emailId, prompt } = await req.json();

  console.log("EMAIL ID RECEIVED:", emailId);

  const email = await prisma.email.findFirst({
    where: {
      OR: [
        { id: emailId },
        { gmailId: emailId },
      ],
    },
  });

  console.log("EMAIL FOUND:", email);

  if (!email) {
    return NextResponse.json({
      error: "Email not found",
    });
  }

  return NextResponse.json({
    reply: `Reply generated for ${email.subject}`,
  });
}