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

    const [first_name, last_name] = name.split(" ");

    const user = await prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        password_hash,
        full_name: name,
        user_account: {
          create: {
            account: {
              create: {
                name: `account-${first_name}`,
              },
            },
          },
        },
      },
      select: {
        id: true,
        user_account: {
          select: {
            id: true,
          },
        },
      },
    });

    await prisma.userAccount.create({
      data: {
        account_id: user.user_account[0].id,
        user_id: user.id,
        roles: ["VIEW_DASHBOARD"],
      },
    });

    return NextResponse.json({
      user: { ...user, password_hash: undefined, password_reset: undefined },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ status: "error", message: error.message }),
      { status: 500 }
    );
  }
}
