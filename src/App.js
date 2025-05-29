import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar"
import Home from './pages/Home';
import Create from './pages/Create';

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editar/:id" element={<Create />} />
          <Route path="/cadastrar" element={<Create />} />
        </Routes>
      </div>
    </Router>
  );
}
