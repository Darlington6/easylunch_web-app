import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StarterPage from './components/starterpage';
import Signup from './components/signup';
import Login from './components/login';
import ForgotPassword from './components/forgotpassword';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StarterPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
