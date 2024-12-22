"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Hotel {
  id: number;
  name: string;
  address: string;
  logo: string;
  qrCode?: string; // Optional QR code field
}

const MainAdminPanel: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    logo: "",
  });

  // Fetch hotels on component mount
  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await fetch("/api/hotels");
      const data: Hotel[] = await response.json();
      setHotels(data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, logo: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/hotels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchHotels(); // Refresh the hotel list
        setFormData({ name: "", address: "", logo: "" });
      } else {
        console.error("Error adding hotel");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const generateQRCode = async (id: number) => {
    try {
      const response = await fetch("/api/hotels", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        fetchHotels(); // Refresh hotel list with updated QR codes
      } else {
        console.error("Error generating QR code");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen pt-20">
      <header className="bg-blue-600 text-white py-4 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Main Admin Panel</h1>
          <button className="bg-blue-800 hover:bg-blue-700 text-sm px-4 py-2 rounded">
            Logout
          </button>
        </div>
      </header>

      <main className="p-6">
        <section className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-lg font-bold mb-4">Add New Hotel</h2>
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="block text-sm font-medium mb-1">
                Hotel Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter hotel name"
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
                placeholder="Enter hotel address"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Upload Logo
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded mt-4"
              >
                Add Hotel
              </button>
            </div>
          </form>
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-4">Registered Hotels</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="p-2 border text-left">Hotel Name</th>
                <th className="p-2 border text-left">Address</th>
                <th className="p-2 border text-center">Logo</th>
                <th className="p-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {hotels.map((hotel) => (
                <tr key={hotel.id}>
                  <td className="p-2 border">{hotel.name}</td>
                  <td className="p-2 border">{hotel.address}</td>
                  <td className="p-2 border text-center">
                    <Image
                      src={hotel.logo}
                      alt={hotel.name}
                      width={50}
                      height={50}
                      className="object-contain"
                    />
                  </td>
                  <td className="p-2 border text-center">
                    {hotel.qrCode ? (
                      <Image
                        src={hotel.qrCode}
                        alt={`QR Code for ${hotel.name}`}
                        width={50}
                        height={50}
                        className="object-contain mx-auto"
                      />
                    ) : (
                      <button
                        onClick={() => generateQRCode(hotel.id)}
                        className="bg-green-600 hover:bg-green-500 text-white px-4 py-1 rounded"
                      >
                        Generate QR
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default MainAdminPanel;
