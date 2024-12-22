import React from "react";

const MainAdminPanel: React.FC = () => {
  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen pt-20">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Main Admin Panel</h1>
          <button className="bg-blue-800 hover:bg-blue-700 text-sm px-4 py-2 rounded">
            Logout
          </button>
        </div>
      </header>

      <main className="p-6">
        {/* Add Hotel Section */}
        <section className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-lg font-bold mb-4">Add New Hotel</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Hotel Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter hotel name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter hotel address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Upload Logo
              </label>
              <input
                type="file"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
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

        {/* Hotel List Section */}
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
              <tr>
                <td className="p-2 border">Hotel A</td>
                <td className="p-2 border">123 Street, City</td>
                <td className="p-2 border text-center">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Hotel Logo"
                    className="mx-auto"
                  />
                </td>
                <td className="p-2 border text-center">
                  <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-1 rounded">
                    Generate QR
                  </button>
                </td>
              </tr>
              <tr>
                <td className="p-2 border">Hotel B</td>
                <td className="p-2 border">456 Avenue, City</td>
                <td className="p-2 border text-center">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Hotel Logo"
                    className="mx-auto"
                  />
                </td>
                <td className="p-2 border text-center">
                  <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-1 rounded">
                    Generate QR
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default MainAdminPanel;
