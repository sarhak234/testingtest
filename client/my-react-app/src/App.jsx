import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import LoginAdmin from './components/loginadmin';
import AdminPage from './components/adminpage';
import HeroPage from './components/heropage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/loginadmin" element={<LoginAdmin />} />
        <Route path="/adminpage" element={<AdminPage/>} />
        <Route path="/heropage" element={<HeroPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
