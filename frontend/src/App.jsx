import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AddPlantPage } from './pages/AddPlantPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-plant" element={<AddPlantPage />} />
      </Routes>
    </Router>
  );
}

export default App;