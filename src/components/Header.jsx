import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ usuario, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      console.log("Token:", authToken);

      await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      localStorage.removeItem("authToken");
      onLogout();
      window.location.href = "/login";
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  return (
    <header className="bg-gray-200 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Información Personal</h2>
        <div className="flex items-center">
          <span className="mr-4">¡Hola, {usuario}!</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 mr-2"
          >
            Cerrar Sesión
          </button>
          <Link to="/dashboard" className="text-blue-500 hover:underline">
            Ir al Dashboard
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
