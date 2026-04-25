"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { signupCounter, signinCounter } from "@/lib/metrics";

export async function signupAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    signupCounter.inc({ status: "fail" });
    throw new Error("User already exists");
  }

  await prisma.user.create({
    data: { email, password },
  });

  signupCounter.inc({ status: "success" });

  redirect("/auth/signin"); // ✅ NO try/catch here
}

export async function signinAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || user.password !== password) {
    signinCounter.inc({ status: "fail" });
    throw new Error("Invalid credentials");
  }

  signinCounter.inc({ status: "success" });

  redirect("/");
}