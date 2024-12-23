"use client";

import React, { useState, useEffect } from "react";

interface Guest {
  id: number;
  fullName: string;
  mobileNumber: string;
  address: string;
  purposeOfVisit: string;
  stayDateFrom: string;
  stayDateTo: string;
  email: string;
  idProofNumber: string;
}

const GuestAdminPanel: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      const response = await fetch("/api/guests");
      const data: Guest[] = await response.json();
      setGuests(data);
    } catch (error) {
      console.error("Error fetching guests:", error);
    }
  };

  const handleEdit = (guest: Guest) => {
    setSelectedGuest(guest);
    setEditMode(true);
  };

  const handleUpdate = async () => {
    if (!selectedGuest) return;

    try {
      const response = await fetch("/api/guests", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedGuest),
      });

      if (response.ok) {
        const updatedGuest = await response.json();
        setGuests((prevGuests) =>
          prevGuests.map((guest) =>
            guest.id === updatedGuest.id ? updatedGuest : guest
          )
        );
        closeModal();
      } else {
        console.error("Error updating guest:", await response.json());
      }
    } catch (error) {
      console.error("Error updating guest:", error);
    }
  };

  const closeModal = () => {
    setSelectedGuest(null);
    setEditMode(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedGuest) {
      setSelectedGuest({
        ...selectedGuest,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen pt-20">
      <header className="bg-blue-600 text-white py-4 px-6">
        <h1 className="text-xl font-bold">Guest Admin Panel</h1>
      </header>

      <main className="p-6">
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-4">Guests List</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="p-2 border text-left">Guest Name</th>
                <th className="p-2 border text-left">Mobile Number</th>
                <th className="p-2 border text-left">Address</th>
                <th className="p-2 border text-left">Purpose of Visit</th>
                <th className="p-2 border text-center">Stay Dates</th>
                <th className="p-2 border text-left">Email ID</th>
                <th className="p-2 border text-left">ID Proof Number</th>
                <th className="p-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((guest) => (
                <tr key={guest.id}>
                  <td className="p-2 border">{guest.fullName}</td>
                  <td className="p-2 border">{guest.mobileNumber}</td>
                  <td className="p-2 border">{guest.address}</td>
                  <td className="p-2 border">{guest.purposeOfVisit}</td>
                  <td className="p-2 border text-center">
                    {new Date(guest.stayDateFrom).toLocaleDateString()} -{" "}
                    {new Date(guest.stayDateTo).toLocaleDateString()}
                  </td>
                  <td className="p-2 border">{guest.email}</td>
                  <td className="p-2 border">{guest.idProofNumber}</td>
                  <td className="p-2 border text-center">
                    <button
                      onClick={() => handleEdit(guest)}
                      className="bg-yellow-500 hover:bg-yellow-400 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {selectedGuest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-2xl">
              <h3 className="text-xl font-bold mb-4">
                {editMode ? "Edit Guest" : "View Guest"} Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Full Name:</p>
                  <input
                    name="fullName"
                    value={selectedGuest.fullName}
                    onChange={handleInputChange}
                    className="border rounded px-2 py-1 w-full"
                    disabled={!editMode}
                  />
                </div>
                <div>
                  <p className="font-semibold">Mobile Number:</p>
                  <input
                    name="mobileNumber"
                    value={selectedGuest.mobileNumber}
                    onChange={handleInputChange}
                    className="border rounded px-2 py-1 w-full"
                    disabled={!editMode}
                  />
                </div>
                <div>
                  <p className="font-semibold">Address:</p>
                  <input
                    name="address"
                    value={selectedGuest.address}
                    onChange={handleInputChange}
                    className="border rounded px-2 py-1 w-full"
                    disabled={!editMode}
                  />
                </div>
                <div>
                  <p className="font-semibold">Purpose of Visit:</p>
                  <input
                    name="purposeOfVisit"
                    value={selectedGuest.purposeOfVisit}
                    onChange={handleInputChange}
                    className="border rounded px-2 py-1 w-full"
                    disabled={!editMode}
                  />
                </div>
                <div>
                  <p className="font-semibold">Email:</p>
                  <input
                    name="email"
                    value={selectedGuest.email}
                    onChange={handleInputChange}
                    className="border rounded px-2 py-1 w-full"
                    disabled={!editMode}
                  />
                </div>
                <div>
                  <p className="font-semibold">ID Proof Number:</p>
                  <input
                    name="idProofNumber"
                    value={selectedGuest.idProofNumber}
                    onChange={handleInputChange}
                    className="border rounded px-2 py-1 w-full"
                    disabled={!editMode}
                  />
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  onClick={closeModal}
                  className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
                >
                  Close
                </button>
                {editMode && (
                  <button
                    onClick={handleUpdate}
                    className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Save Changes
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default GuestAdminPanel;
