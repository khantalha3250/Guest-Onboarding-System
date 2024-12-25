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

const GuestLandingPage: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);

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

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen pt-20">
      <header className="bg-blue-600 text-white py-4 px-6 text-center">
        <h1 className="text-xl font-bold">Welcome to Our Hotels</h1>
        <p className="text-sm">Explore and scan QR codes to learn more</p>
      </header>

      <main className="p-6">
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
            >
              <Image
                src={hotel.logo}
                alt={hotel.name}
                width={100}
                height={100}
                className="rounded-full object-contain mb-4"
              />
              <h2 className="text-lg font-bold">{hotel.name}</h2>
              <p className="text-sm text-gray-600 text-center">
                {hotel.address}
              </p>

              <div className="mt-4">
                {hotel.qrCode ? (
                  <Image
                    src={hotel.qrCode}
                    alt={`QR Code for ${hotel.name}`}
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                ) : (
                  <p className="text-red-500 text-sm">QR Code not available</p>
                )}
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default GuestLandingPage;
