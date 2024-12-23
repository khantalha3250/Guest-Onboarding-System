import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

// Instantiate PrismaClient
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
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
      } = req.body;

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
        return res.status(400).json({ error: "All fields are required" });
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

      res.status(201).json(newGuest);
    } catch (error) {
      console.error("Error creating guest:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
