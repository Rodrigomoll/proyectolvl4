// ModalAgregarUsuario.js
import React, { useState } from "react";

const ModalAgregarUsuario = ({ isOpen, onClose }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [segundoNombre, setSegundoNombre] = useState("");
  const [segundoApellido, setSegundoApellido] = useState("");
  const [estado, setEstado] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleAgregarUsuario = async () => {
    try {
      setIsLoading(true);

      const response = await fetch("http://127.0.0.1:8000/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          primerNombre: nombre,
          segundoNombre: segundoNombre,
          primerApellido: apellido,
          segundoApellido: segundoApellido,
          usuario: usuario,
          password: password,
          idRol: 1, // Cambia el valor según el ID del rol que corresponda
          estado: estado,
        }),
      });

      if (response.ok) {
        onClose();
        console.log("Usuario agregado exitosamente");
      } else {
        console.error("Error al agregar el usuario:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={isOpen ? "fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75" : "hidden"}>
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Agregar Usuario</h2>
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
            Primer Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="segundoNombre" className="block text-sm font-medium text-gray-700">
            Segundo Nombre:
          </label>
          <input
            type="text"
            id="segundoNombre"
            value={segundoNombre}
            onChange={(e) => setSegundoNombre(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">
            Primer Apellido:
          </label>
          <input
            type="text"
            id="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="segundoApellido" className="block text-sm font-medium text-gray-700">
            Segundo Apellido:
          </label>
          <input
            type="text"
            id="segundoApellido"
            value={segundoApellido}
            onChange={(e) => setSegundoApellido(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">
            Usuario:
          </label>
          <input
            type="text"
            id="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleAgregarUsuario}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
            disabled={isLoading}
          >
            {isLoading ? "Agregando..." : "Agregar Usuario"}
          </button>
          <button onClick={onClose} className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAgregarUsuario;
