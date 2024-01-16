import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./components/Login";
import { PersonalInfo } from "./components/PersonalInfo";
import { EditInfo } from "./components/EditInfo";

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
          path="/personalinfo"
          element={isLoggedIn ? <PersonalInfo /> : <Navigate to="/login" />}
        />
        <Route path="/editar" element={isLoggedIn ? <EditInfo /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
