import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signinCounter } from "@/lib/metrics"; // from your metrics.ts

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      signinCounter.inc({ status: "fail" });
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    // NOTE: swap user.password !== password for bcrypt.compare() once you
    // add hashing — for now matches your existing schema
    if (!user || user.password !== password) {
      signinCounter.inc({ status: "fail" });
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    signinCounter.inc({ status: "success" });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/auth/signin]", err);
    signinCounter.inc({ status: "fail" });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}