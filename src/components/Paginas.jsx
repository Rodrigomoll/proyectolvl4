import React, { useEffect, useState } from "react";
import ModalAgregarPagina from "./ModalAgregarPagina"; 

const Paginas = () => {
  const [paginas, setPaginas] = useState([]);
  const [mostrarModalAgregar, setMostrarModalAgregar] = useState(false);

  useEffect(() => {
    const fetchPaginas = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/paginas");
        if (response.ok) {
          const data = await response.json();
          setPaginas(data);
        } else {
          console.error("Error al obtener páginas:", response.statusText);
        }
      } catch (error) {
        console.error("Error al obtener páginas:", error.message);
      }
    };

    fetchPaginas();
  }, []);

  const abrirModalAgregar = () => {
    setMostrarModalAgregar(true);
  };

  const cerrarModalAgregar = async () => {
    setMostrarModalAgregar(false);
    await fetchPaginas();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Lista de Páginas</h2>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            abrirModalAgregar();
          }}
          className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Agregar Página
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">URL</th>
            <th className="border border-gray-300 p-2">Nombre</th>
            <th className="border border-gray-300 p-2">Descripción</th>
          </tr>
        </thead>
        <tbody>
          {paginas.map((pagina) => (
            <tr key={pagina.id}>
              <td className="border border-gray-300 p-2">{pagina.id}</td>
              <td className="border border-gray-300 p-2">{pagina.url}</td>
              <td className="border border-gray-300 p-2">{pagina.nombre}</td>
              <td className="border border-gray-300 p-2">{pagina.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalAgregarPagina isOpen={mostrarModalAgregar} onClose={cerrarModalAgregar} />
    </div>
  );
};

export default Paginas;
