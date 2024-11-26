import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashbordlayout from "./components/shared/Dashbordlayout";
import Dashboard from "./components/Dashboard";
import IncomingOrder from "./components/IncomingOrder";
import RegisterProdutcts from "./components/RegisterProdutcts";
import ProductList from "./components/ProductList";
import OrderForm from "./components/OrderForm";
import OrderHistory from "./components/OrderHistory";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashbordlayout />}>
          {/* Redirect to dashboard when accessing the root URL */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="incomingorder" element={<IncomingOrder />} />
          <Route path="productregistration" element={<RegisterProdutcts />} />
          <Route path="productlist" element={<ProductList />} />
          <Route path="ordering" element={<OrderForm />} />
          <Route path="orderhistory" element={<OrderHistory />} />
          


          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
