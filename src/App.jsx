import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar.jsx';
import StoryList from './components/StoryList.jsx';
import StoryDetail from './components/StoryDetail.jsx';
import StoryForm from './components/StoryForm.jsx';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<StoryList />} />
            <Route path="/story/:id" element={<StoryDetail />} />
            <Route path="/create" element={<StoryForm />} />
            <Route path="/edit/:id" element={<StoryForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;