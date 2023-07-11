import { prisma } from "@/lib/prisma";
import { z } from "@/lib/zod";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

const schema = z.object({
  name: z.string().trim().min(4),
  email: z
    .string()
    .email()
    .transform((email) => email.toLowerCase()),
  password: z.string().min(4),
});

export async function POST(req: Request) {
  try {
    const { name, email, password } = schema.parse(await req.json());
    const password_hash = await hash(password, 4);

    const user = await prisma.user.create({
      data: { name, email, password: password_hash },
    });

    return NextResponse.json({
      user: { name: user.name, email: user.email },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ status: "error", message: error.message }),
      { status: 500 }
    );
  }
}
