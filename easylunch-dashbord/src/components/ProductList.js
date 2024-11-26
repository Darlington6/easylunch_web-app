import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Modal Component for Editing Product
const EditProductModal = ({ isOpen, product, onClose, onSave }) => {
  const [product_name, setName] = useState(product.product_name || '');
  const [price, setPrice] = useState(product.price || '');

  const handleSave = () => {
    onSave(product.id, { product_name, price });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
        <h2 className="text-xl mb-4">Edit Product</h2>
        <div className="mb-4">
          <label className="block text-sm text-gray-700">Product Name</label>
          <input
            type="text"
            value={product_name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-700">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex justify-end">
          <button
            className="mr-2 bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products/');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Handle deleting a product
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/products/delete/${id}/`);
        setProducts(products.filter(product => product.id !== id)); // Remove deleted product from the state
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  // Handle editing a product
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Save edited product
  const handleSaveProduct = async (id, updatedProduct) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/products/${id}/`, updatedProduct);
      setProducts(products.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      ));
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="font-sans overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100 whitespace-nowrap">
          <tr>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Product Name
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-4 py-4 text-sm text-gray-800">{product.product_name}</td>
              <td className="px-4 py-4 text-sm text-gray-800">${product.price}</td>
              <td className="px-4 py-4 text-sm text-gray-800">
                <button
                  className="text-blue-600 mr-4"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Product Modal */}
      {selectedProduct && (
        <EditProductModal
          isOpen={isModalOpen}
          product={selectedProduct}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
};

export default ProductList;
