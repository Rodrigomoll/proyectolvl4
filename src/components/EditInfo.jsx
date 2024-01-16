import React, { useState, useEffect } from "react";

const EditInfo = () => {
  const [userInfo, setUserInfo] = useState({
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    usuario: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/updateUserInfo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userInfo),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar la información del usuario");
      }

      console.log("Información del usuario actualizada con éxito");
    } catch (error) {
      console.error("Error", error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-left">Editar Información</h2>
      <div className="mb-4">
        <label className="text-gray-700">Primer Nombre:</label>
        <input
          type="text"
          name="primerNombre"
          value={userInfo.primerNombre}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="text-gray-700">Segundo Nombre:</label>
        <input
          type="text"
          name="segundoNombre"
          value={userInfo.segundoNombre}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="text-gray-700">Primer Apellido:</label>
        <input
          type="text"
          name="primerApellido"
          value={userInfo.primerApellido}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="text-gray-700">Segundo Apellido:</label>
        <input
          type="text"
          name="segundoApellido"
          value={userInfo.segundoApellido}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="text-gray-700">Usuario:</label>
        <input
          type="text"
          name="usuario"
          value={userInfo.usuario}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="text-gray-700">Contraseña:</label>
        <input
          type="password"
          name="password"
          value={userInfo.password}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <button
        onClick={handleUpdate}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full"
      >
        Guardar Cambios
      </button>
    </div>
  );
};

export { EditInfo };
