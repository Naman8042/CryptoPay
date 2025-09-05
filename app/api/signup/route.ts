import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { email, password, walletAddress } = await req.json();

    if (!email || !password || !walletAddress) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 🔎 Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { walletAddress }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email or Wallet Address already registered" },
        { status: 409 } 
      );
    }

    // ✅ Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // ✅ Store in DB
    const user = await prisma.user.create({
      data: {
        email,
        password: passwordHash,
        walletAddress,
      },
    });

    // Remove password before returning response
    const { password: _, ...safeUser } = user;

    return NextResponse.json(safeUser, { status: 201 });
  } catch (err) {
    console.error("❌ Signup error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
