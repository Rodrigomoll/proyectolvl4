import React, { useState } from "react";

const ModalAgregarRol = ({ isOpen, onClose, recargarRoles }) => {
  const [nombreRol, setNombreRol] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAgregarRol = async () => {
    try {
      setIsLoading(true);

      const response = await fetch("http://127.0.0.1:8000/api/roles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rol: nombreRol, estado: true }), // Cambia el valor de "estado" según tus necesidades
      });

      if (response.ok) {
        onClose();
        recargarRoles();
        console.log("Rol agregado exitosamente");
      } else {
        console.error("Error al agregar el rol:", response.statusText);
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
        <h2 className="text-xl font-semibold mb-4">Agregar Rol</h2>
        <div className="mb-4">
          <label htmlFor="nombreRol" className="block text-sm font-medium text-gray-700">
            Nombre del Rol:
          </label>
          <input
            type="text"
            id="nombreRol"
            value={nombreRol}
            onChange={(e) => setNombreRol(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleAgregarRol}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            {isLoading ? "Agregando..." : "Agregar Rol"}
          </button>
          <button onClick={onClose} className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAgregarRol;
