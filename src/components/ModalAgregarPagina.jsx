import React, { useState } from "react";

const ModalAgregarPagina = ({ isOpen, onClose }) => {
  const [url, setUrl] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAgregarPagina = async () => {
    try {
      setIsLoading(true);

      const response = await fetch("http://127.0.0.1:8000/api/paginas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, nombre, descripcion }),
      });

      if (response.ok) {
        onClose();
        console.log("Página agregada exitosamente");
      } else {
        console.error("Error al agregar la página:", response.statusText);
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
        <h2 className="text-xl font-semibold mb-4">Agregar Página</h2>
        <div className="mb-4">
          <label htmlFor="url" className="block text-sm font-medium text-gray-700">
            URL:
          </label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
            Nombre:
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
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
            Descripción:
          </label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleAgregarPagina}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
            disabled={isLoading} // Deshabilita el botón mientras se está procesando
          >
            {isLoading ? "Agregando..." : "Agregar Página"}
          </button>
          <button onClick={onClose} className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAgregarPagina;
