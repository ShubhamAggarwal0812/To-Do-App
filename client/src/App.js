// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import TodoScreen from './pages/TodoScreen';
import AboutScreen from './pages/AboutScreen';
import HelpScreen from './pages/HelpScreen';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/todos" element={<TodoScreen />} />
            <Route path="/about" element={<AboutScreen />} />
            <Route path="/help" element={<HelpScreen />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
