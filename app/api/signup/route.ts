import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';
import bcrypt from "bcryptjs";


// Register user
export async function POST(req: NextRequest) {
  let { email, password, walletAddress } =  await req.json();

  console.log(email,password,walletAddress)
  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  password = passwordHash

  // Store in DB
  const user = await prisma.user.create({
    data: {
      email,
      password,
      walletAddress,
    },
  });

  return NextResponse.json(user, { status: 201 });  // ✅ Correct
}
