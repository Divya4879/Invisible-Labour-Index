import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Trends from './pages/Trends';
import PolicySimulator from './pages/PolicySimulator';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-neutral-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/crisis-monitor" element={<Dashboard />} />
          <Route path="/global-rankings" element={<Trends />} />
          <Route path="/policy-impact-engine" element={<PolicySimulator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
