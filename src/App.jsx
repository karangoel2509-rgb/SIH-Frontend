import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CitizenScanner from './pages/CitizenScanner';
import OfficerDashboard from './pages/OfficerDashboard';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/citizen" element={<CitizenScanner />} />
        <Route path="/officer" element={<OfficerDashboard />} />
      </Routes>
    </Router>
  );
}