import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PersonalInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      fetch('http://127.0.0.1:8000/api/getUserInfo', {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener la información del usuario');
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-left">Información Personal</h2>
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
      <Link to="/editar" className="text-blue-500 hover:underline">Editar Información</Link>
    </div>
  );
};

export { PersonalInfo };
