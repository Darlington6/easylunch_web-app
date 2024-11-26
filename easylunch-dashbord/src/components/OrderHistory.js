import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch past orders
  useEffect(() => {
    const fetchOrders = () => {
      axios.get('http://127.0.0.1:8000/api/orders/')
        .then(response => {
          const pastOrders = response.data
            .filter(order => new Date(order.pickup_date) < new Date())
            .sort((a, b) => {
              const dateA = new Date(a.pickup_date);
              const dateB = new Date(b.pickup_date);
              return dateB - dateA; // Sort by pickup_date descending (latest first)
            });
          setOrders(pastOrders);
          setLoading(false);
        })
        .catch(error => {
          setError("There was an error fetching order history.");
          console.error(error);
          setLoading(false);
        });
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading order history...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="overflow-x-auto mb-40 sm:rounded-lg">
      <h1 className="font-bold leading-relaxed text-2xl text-center py-10">Order History</h1>
      <table className="ml-72 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Names</th>
            <th scope="col" className="px-6 py-3">Customer Email</th>
            <th scope="col" className="px-6 py-3">Phone Number</th>
            <th scope="col" className="px-6 py-3">Product & Quantity</th>
            <th scope="col" className="px-6 py-3">Pickup Date</th>
            <th scope="col" className="px-6 py-3">Total Price</th>
            
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
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
