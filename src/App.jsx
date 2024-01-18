import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./components/Login";
import { PersonalInfo } from "./components/PersonalInfo";
import { EditInfo } from "./components/EditInfo";
import Dashboard from "./components/Dashboard";
import Roles from "./components/Roles";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route
          path="/personalInfo"
          element={isLoggedIn ? <PersonalInfo /> : <Navigate to="/login" />}
        />
        {/* Utiliza la prop "element" para especificar el componente a renderizar */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editar/:usuario" element={<EditInfo />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
