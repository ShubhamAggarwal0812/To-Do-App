// client/src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./pages/home-screen";
import LoginScreen from "./pages/login-screen";
import RegisterScreen from "./pages/register-screen";
import TodoScreen from "./pages/todo-screen";
import AboutScreen from "./pages/about-screen";
import HelpScreen from "./pages/help-screen";
import Header from "./components/header-component";
import Footer from "./components/footer-component";

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
