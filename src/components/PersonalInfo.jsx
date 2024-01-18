import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EditInfo } from "./EditInfo";
import Header from "./Header";

const PersonalInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const updateUserInfo = (newUserInfo) => {
    setUserInfo(newUserInfo);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      fetch("http://127.0.0.1:8000/api/getUserInfo", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener la información del usuario");
          }
          return response.json();
        })
        .then((data) => {
          setUserInfo(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error", error.message);
          setError(error.message);
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userInfo) {
    return <div>No se encontró información del usuario.</div>;
  }

  return (
    <div>
      <Header usuario={userInfo.usuario} onLogout={handleLogout} />
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
        <div className="mb-4">
          <span className="text-gray-700">Usuario:</span> {userInfo.usuario}
        </div>
        <div className="mb-4">
          <span className="text-gray-700">Nombres:</span>{" "}
          {userInfo.primerNombre} {userInfo.segundoNombre}
        </div>
        <div className="mb-4">
          <span className="text-gray-700">Apellidos:</span>{" "}
          {userInfo.primerApellido} {userInfo.segundoApellido}
        </div>
        <div className="mb-4">
          <span className="text-gray-700">Contraseña:</span>{" "}
          <input
            type="password"
            value={userInfo.password}
            disabled
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <Link
          to={`/editar/${userInfo.usuario}`}
          className="text-blue-500 hover:underline"
        >
          Editar Información
        </Link>
      </div>
    </div>
  );
};

export { PersonalInfo };
