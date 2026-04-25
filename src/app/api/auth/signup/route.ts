import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signupCounter } from "@/lib/metrics"; // from your metrics.ts

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      signupCounter.inc({ status: "fail" });
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      signupCounter.inc({ status: "fail" });
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    await prisma.user.create({
      data: { email, password }, // add bcrypt.hash(password, 10) when ready
    });

    signupCounter.inc({ status: "success" });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/auth/signup]", err);
    signupCounter.inc({ status: "fail" });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}