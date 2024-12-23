import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import QRCode from "qrcode";

const prisma = new PrismaClient();

// Handle POST requests (Add New Hotel)
export async function POST(req: NextRequest) {
  try {
    const { name, address, logo } = await req.json();

    const newHotel = await prisma.hotel.create({
      data: { name, address, logo },
    });

    return NextResponse.json(newHotel, { status: 201 });
  } catch (error) {
    console.error("Error creating hotel:", error);
    return NextResponse.json(
      { error: "Error creating hotel" },
      { status: 500 }
    );
  }
}

// Handle GET requests (Fetch All Hotels)
export async function GET() {
  try {
    const hotels = await prisma.hotel.findMany();
    return NextResponse.json(hotels, { status: 200 });
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return NextResponse.json(
      { error: "Error fetching hotels" },
      { status: 500 }
    );
  }
}

// Handle PATCH requests (Generate and Save QR Code)
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    // Validate input
    if (!id) {
      return NextResponse.json(
        { error: "Hotel ID is required" },
        { status: 400 }
      );
    }

    // Find the hotel by ID
    const hotel = await prisma.hotel.findUnique({ where: { id } });

    if (!hotel) {
      return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
    }

    // Generate QR code with the route to the guest form
    const qrCodeRoute = `http://localhost:3000/guest-page/${encodeURIComponent(
      hotel.id
    )}`;
    const qrCodeData = await QRCode.toDataURL(qrCodeRoute);

    // Update the hotel record with the generated QR code
    const updatedHotel = await prisma.hotel.update({
      where: { id },
      data: { qrCode: qrCodeData },
    });

    return NextResponse.json(updatedHotel, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error generating QR code:", error.message);
      return NextResponse.json(
        { error: "Error generating QR code" },
        { status: 500 }
      );
    }

    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
