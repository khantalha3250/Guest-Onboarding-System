import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Instantiate PrismaClient
const prisma = new PrismaClient();

// POST: Create a new guest
export async function POST(req: NextRequest) {
  try {
    const {
      fullName,
      mobileNumber,
      address,
      purposeOfVisit,
      stayDateFrom,
      stayDateTo,
      email,
      idProofNumber,
      hotelId,
    } = await req.json();

    // Validate required fields
    if (
      !fullName ||
      !mobileNumber ||
      !address ||
      !purposeOfVisit ||
      !stayDateFrom ||
      !stayDateTo ||
      !email ||
      !idProofNumber ||
      !hotelId
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Create new guest
    const newGuest = await prisma.guest.create({
      data: {
        fullName,
        mobileNumber,
        address,
        purposeOfVisit,
        stayDateFrom: new Date(stayDateFrom),
        stayDateTo: new Date(stayDateTo),
        email,
        idProofNumber,
        hotelId,
      },
    });

    return NextResponse.json(newGuest, { status: 201 });
  } catch (error) {
    console.error("Error creating guest:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Optionally handle other HTTP methods
export function OPTIONS() {
  return NextResponse.json(null, { status: 204 });
}
