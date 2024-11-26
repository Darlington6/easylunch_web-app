import React, { useState } from 'react';
import axios from 'axios';

const RegisterProducts = () => {

  const [product_name, setproduct_name] = useState('');
  const [price, setPrice] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Send POST request to backend API
      await axios.post('http://127.0.0.1:8000/api/products/', {
        product_name,
        price,
      });

      // Clear input fields after successful submission
      setproduct_name('');
      setPrice('');
    } catch (error) {
      console.error('Error registering product:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4 font-[sans-serif]">
        <input
          type="text"
          placeholder="Product name"
          value={product_name}
          onChange={(e) => setproduct_name(e.target.value)}
          className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded"
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-transparent focus:border-blue-500 rounded"
          required
        />

        <button
          type="submit"
          className="!mt-8 w-full px-4 py-2.5 mx-auto block text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Register product
        </button>
      </form>
    </div>
  );
};

export default RegisterProducts;
