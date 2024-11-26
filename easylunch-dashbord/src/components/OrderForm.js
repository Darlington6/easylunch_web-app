import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderForm = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    pickup_date:'',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [total, setTotal] = useState(0);

  // Fetching products using the correct endpoint
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/products/') // Matches 'products/' endpoint
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the products:", error);
      });
  }, []);

  const handleProductSelect = (product) => {
    setSelectedProducts(prev => {
      const isSelected = prev.find(p => p.product_name === product.product_name);
      if (isSelected) {
        // If product is already selected, remove it
        return prev.filter(p => p.product_name !== product.product_name);
      } else {
        // Otherwise, add the product with quantity set to 1
        return [...prev, { product_name: product.product_name, quantity: 1 }];
      }
    });
  };

  const handleQuantityChange = (productName, quantity) => {
    setSelectedProducts(prev =>
      prev.map(p => 
        p.product_name === productName 
          ? { ...p, quantity: parseInt(quantity) }  // Update quantity
          : p
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if at least one product is selected
    if (selectedProducts.length === 0) {
      alert('Please select at least one product before submitting.');
      return;  // Prevent form submission
    }

    // Check if pickup date is in the past
    const currentDate = new Date();
    const pickupDate = new Date(formData.pickup_date);
    if (pickupDate < currentDate) {
      alert('Pickup date cannot be in the past. Please select a future date.');
      return;  // Prevent form submission
    }

    // Prepare order data to send to backend
    const orderData = {
      customer_name: formData.customer_name,
      customer_email: formData.customer_email,
      customer_phone: formData.customer_phone,
      pickup_date: formData.pickup_date,
      product_quantities: selectedProducts.reduce((acc, curr) => {
        acc[curr.product_name] = curr.quantity;
        return acc;
      }, {}),
      total: total,
    };

    // Send order data to the backend using the correct endpoint
    axios.post('http://127.0.0.1:8000/api/orders/', orderData, { // Matches 'orders/' endpoint
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(() => {
        // Display success message and reset form
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        setFormData({ customer_name: '', customer_email: '', customer_phone: '' ,pickup_date:''});
        setSelectedProducts([]);
        setTotal(0);
      })
      .catch(error => {
        console.error("There was an error submitting the order:", error);
      });
  };

  // Calculate total based on selected products and quantities
  useEffect(() => {
    let calculatedTotal = 0;
    selectedProducts.forEach(selected => {
      const product = products.find(p => p.product_name === selected.product_name);
      if (product) {
        calculatedTotal += product.price * selected.quantity;
      }
    });
    setTotal(calculatedTotal);
  }, [selectedProducts, products]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Success message */}
      {showSuccess && (
        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          Order submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Customer name */}
        <div>
          <label className="block text-black mb-2">Customer Name:</label>
          <input
            type="text"
            required
            className="w-full placeholder:Customer Name p-2 border rounded text-black required"
            value={formData.customer_name}
            onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
          />
        </div>

        {/* Customer email */}
        <div>
          <label className="block text-black mb-2">Customer Email:</label>
          <input
            type="email"
            required
            className="w-full p-2 border rounded text-black required"
            value={formData.customer_email}
            onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
          />
        </div>

        {/* Customer phone */}
        <div>
          <label className="block text-black mb-2">Phone Number:</label>
          <input
            type="text"
            value={formData.customer_phone}
            required
            className="w-full p-2 border rounded text-black required"
            onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
          />
        </div>

        {/* Product selection and quantity */}
        <div>
          <label className="block text-black mb-2">Products:</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map(product => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 border rounded"
              >
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-500"
                    checked={selectedProducts.some(p => p.product_name === product.product_name)}
                    onChange={() => handleProductSelect(product)}
                  />
                  <span className="text-black">{product.product_name}</span>
                </label>

                {/* Display quantity input when product is selected */}
                {selectedProducts.some(p => p.product_name === product.product_name) && (
                  <input
                    type="number"
                    min="1"
                    className="w-20 p-1 border rounded bg-gray-700 text-black"
                    value={selectedProducts.find(p => p.product_name === product.product_name)?.quantity || 1}
                    onChange={(e) => handleQuantityChange(product.product_name, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
  <label className="block text-black mb-2">Pickup Date:</label>
  <input
    type="datetime-local"  // Updated to datetime-local to handle date and time
    required
    className="w-full p-2 border rounded text-black"
    value={formData.pickup_date}
    onChange={(e) => setFormData({ ...formData, pickup_date: e.target.value })}
  />
</div>


        {/* Total amount */}
        <div>
          <label className="block text-black mb-2">Total:</label>
          <input
            type="number"
            className="w-full p-2 border rounded text-black"
            value={total}
            readOnly
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-black py-2 px-4 rounded hover:bg-blue-600"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
