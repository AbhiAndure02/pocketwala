import React, { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all orders from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders") // Change this to match your backend API route
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Admin Order Management</h2>

      {/* Loading State */}
      {loading && <p className="text-center text-lg">Loading Orders...</p>}

      {/* No Orders Found */}
      {!loading && orders.length === 0 && (
        <p className="text-center text-lg text-red-500">No Orders Found</p>
      )}

      {/* Orders Table */}
      {!loading && orders.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="border border-gray-300 px-4 py-2">user name</th>
                <th className="border border-gray-300 px-4 py-2">Placement</th>
                <th className="border border-gray-300 px-4 py-2">Size</th>
                <th className="border border-gray-300 px-4 py-2">Color</th>
                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) =>
                order.items.map((item, i) => (
                  <tr key={`${index}-${i}`} className="text-center">
                    <td className="border border-gray-300 px-4 py-2">{order.userName}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.placement}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.size}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.color}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                    <td className="border border-gray-300 px-4 py-2">₹{item.price}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Admin;
