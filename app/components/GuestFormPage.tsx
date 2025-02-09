"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

const GuestFormPage: React.FC = () => {
  const router = useRouter();
  const { id: hotelId } = useParams(); // Get the hotel ID from the URL
  const [hotelName, setHotelName] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    address: "",
    purposeOfVisit: "",
    stayDateFrom: "",
    stayDateTo: "",
    email: "",
    idProofNumber: "",
  });

  // Fetch hotel details using the hotel ID
  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await fetch(`/api/hotels/${hotelId}`);
        if (response.ok) {
          const data = await response.json();
          setHotelName(data.name); // Set the hotel name
        } else {
          console.error("Failed to fetch hotel details");
        }
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      }
    };

    if (hotelId) fetchHotelDetails();
  }, [hotelId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = { ...formData, hotelId: Number(hotelId) }; // Add hotelId to form data
      const response = await fetch("/api/guests/[id]", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push("/thank-you");
      } else {
        console.error("Error submitting the form");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen pt-20">
      <header className="bg-blue-600 text-white py-4 px-6">
        <h1 className="text-xl font-bold">
          Welcome to {hotelName ? hotelName : "Loading..."}
        </h1>
      </header>

      <main className="p-6">
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-4">Guest Information Form</h2>
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            onSubmit={handleSubmit}
          >
            {/* Form Fields */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your mobile number"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your address"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Purpose of Visit
              </label>
              <select
                name="purposeOfVisit"
                value={formData.purposeOfVisit}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                required
              >
                <option value="">Select</option>
                <option value="Business">Business</option>
                <option value="Personal">Personal</option>
                <option value="Tourist">Tourist</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Stay Date From
              </label>
              <input
                type="date"
                name="stayDateFrom"
                value={formData.stayDateFrom}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Stay Date To
              </label>
              <input
                type="date"
                name="stayDateTo"
                value={formData.stayDateTo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email ID</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                ID Proof Number
              </label>
              <input
                type="text"
                name="idProofNumber"
                value={formData.idProofNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your ID proof number"
                required
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded mt-4"
              >
                Submit
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default GuestFormPage;
