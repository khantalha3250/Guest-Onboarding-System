import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json(); // Parse the JSON body

    console.log("Received login request:", { email, password });

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    // Find the guest admin by email
    const mainAdmin = await prisma.mainAdmin.findUnique({
      where: { email },
    });

    if (!mainAdmin) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Compare the hashed password
    const isPasswordValid = await bcrypt.compare(password, mainAdmin.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Return success response
    return NextResponse.json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during guest admin login:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
