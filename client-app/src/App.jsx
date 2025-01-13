// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';  // Footer bileşenini import ediyoruz
import Home from './pages/Home'; 
import About from './pages/About';
import PhishingSimulator from './pages/PhishingSimulator';
import LoginPage from './pages/LoginPage';
import UserPanel from './pages/UserPanel';
import Contact from './pages/Contact';
import BaitingSimulator from './pages/BaitingSimulator';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/userpanel" element={<UserPanel />} />
          <Route path="/simulators/phishing" element={<PhishingSimulator />} />
          <Route path="/simulators/baiting" element={<BaitingSimulator />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer footerData={{/* footer verilerini buraya ekleyebilirsiniz */}} />  {/* Footer'ı burada ekliyoruz */}
      </Router>
    </AuthProvider>
  );
}


export default App;
