import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Memories from './pages/Memories';
import SecretCodeModal from './pages/SecretCodeModal';
import LoveStoryTimeline from './pages/LoveStoryTimeline';
import NavBar from './components/Navbar';
import HeartFloat from './components/HeartFloat';
import CursorHearts from './components/CursorHearts'; // ✅ import
import Infromation from './components/BirthdayForm';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
    <Toaster position="top-right" reverseOrder={false} />
      <CursorHearts /> {/* ✅ Add here */}
      <HeartFloat />
      <NavBar />
      <Routes>
        <Route path="/" element={<Infromation />} />
        <Route path="/welcome/:birthdayId" element={<Welcome />} />
        <Route path="/memories/:birthdayId" element={<Memories />} />
        <Route path="/special/:birthdayId" element={<SecretCodeModal />} />
        <Route path="/loveStory/:birthdayId" element={<LoveStoryTimeline />} />
      </Routes>
    </Router>
  );
}

export default App;
