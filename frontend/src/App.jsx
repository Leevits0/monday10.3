import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

// pages & components
import Navbar from "./components/Navbar";
import Home from "./pages/HomePage";
import AddPropertyPage from "./pages/AddPropertyPage";
import PropertyPage from "./pages/PropertyPage";
import EditPropertyPage from "./pages/EditPropertyPage";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties/:id" element={<PropertyPage />} />
            <Route path="/properties/add-property" element={<AddPropertyPage />} />
            <Route path="/edit-property/:id" element={<EditPropertyPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;