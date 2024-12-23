import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Handle POST requests (Add New Guest)
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
      !idProofNumber
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Create a new guest record
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
      },
    });

    return NextResponse.json(newGuest, { status: 201 });
  } catch (error) {
    console.error("Error adding guest:", error);
    return NextResponse.json({ error: "Error adding guest" }, { status: 500 });
  }
}

// Handle GET requests (Fetch All Guests)
export async function GET() {
  try {
    const guests = await prisma.guest.findMany();
    return NextResponse.json(guests, { status: 200 });
  } catch (error) {
    console.error("Error fetching guests:", error);
    return NextResponse.json(
      { error: "Error fetching guests" },
      { status: 500 }
    );
  }
}
export async function PATCH(req: NextRequest) {
  try {
    const {
      id,
      fullName,
      mobileNumber,
      address,
      purposeOfVisit,
      stayDateFrom,
      stayDateTo,
      email,
      idProofNumber,
    } = await req.json();

    // Validate required fields
    if (!id) {
      return NextResponse.json(
        { error: "Guest ID is required" },
        { status: 400 }
      );
    }

    // Update guest record
    const updatedGuest = await prisma.guest.update({
      where: { id },
      data: {
        fullName,
        mobileNumber,
        address,
        purposeOfVisit,
        stayDateFrom: stayDateFrom ? new Date(stayDateFrom) : undefined,
        stayDateTo: stayDateTo ? new Date(stayDateTo) : undefined,
        email,
        idProofNumber,
      },
    });

    return NextResponse.json(updatedGuest, { status: 200 });
  } catch (error) {
    console.error("Error updating guest:", error);
    return NextResponse.json(
      { error: "Error updating guest" },
      { status: 500 }
    );
  }
}
