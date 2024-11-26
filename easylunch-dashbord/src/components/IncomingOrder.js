import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IncomingOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders initially and set up re-fetching every few seconds (simulating new orders)
  useEffect(() => {
    const fetchOrders = () => {
      axios.get('http://127.0.0.1:8000/api/orders/')
        .then(response => {
          const sortedOrders = response.data.sort((a, b) => {
            const dateA = new Date(a.pickup_date);
            const dateB = new Date(b.pickup_date);
            return dateA - dateB; // Sort by pickup_date ascending (earliest first)
          });
          setOrders(sortedOrders);
          setLoading(false);
        })
        .catch(error => {
          setError("There was an error fetching orders.");
          console.error(error);
          setLoading(false);
        });
    };

    fetchOrders();
    
    // Simulate a new order coming in every 10 seconds (you can adjust as needed)
    const interval = setInterval(() => {
      fetchOrders();
    }, 10000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="overflow-x-auto mb-40 sm:rounded-lg">
      <h1 className="font-bold leading-relaxed text-2xl text-center py-10">Incoming Orders</h1>
      <table className="ml-72 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Names</th>
            <th scope="col" className="px-6 py-3">Customer Email</th>
            <th scope="col" className="px-6 py-3">Phone Number</th>
            <th scope="col" className="px-6 py-3">Product & Quantity</th>
            <th scope="col" className="px-6 py-3">Pickup Date</th>
            <th scope="col" className="px-6 py-3">Total Price</th>
            <th scope="col" className="px-6 py-3">Order Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4">{order.customer_name}</td>
              <td className="px-6 py-4">{order.customer_email}</td>
              <td className="px-6 py-4">{order.customer_phone}</td>
              <td className="px-6 py-4">
                {Object.entries(order.product_quantities).map(([productName, quantity], index) => (
                  <div key={index}>
                    {productName}: {quantity}
                  </div>
                ))}
              </td>
              <td className="px-6 py-4">{order.pickup_date}</td>
              <td className="px-6 py-4">{order.total}</td>
              <td className="px-6 py-4">
                <select className="border rounded px-2 py-1 text-sm focus:ring focus:outline-none">
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Completed">Completed</option>
                  <option value="Completed">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncomingOrder;
