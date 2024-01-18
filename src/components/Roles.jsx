import React, { useEffect, useState } from "react";
import ModalAgregarRol from "./ModalAgregarRol";

const Roles = ({ recargarRoles }) => {
  const [roles, setRoles] = useState([]);
  const [mostrarModalAgregar, setMostrarModalAgregar] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/roles");
        if (response.ok) {
          const data = await response.json();
          setRoles(data);
        } else {
          console.error("Error al obtener roles:", response.statusText);
        }
      } catch (error) {
        console.error("Error al obtener roles:", error.message);
      }
    };

    fetchRoles();
  }, [recargarRoles]);

  const abrirModalAgregar = () => {
    setMostrarModalAgregar(true);
  };

  const cerrarModalAgregar = async () => {
    setMostrarModalAgregar(false);
    await recargarRoles();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Lista de Roles</h2>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            abrirModalAgregar();
            recargarRoles(); // Asegúrate de llamar a la función de recarga al abrir el modal
          }}
          className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Agregar Rol
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Rol</th>
            <th className="border border-gray-300 p-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((rol) => (
            <tr key={rol.id}>
              <td className="border border-gray-300 p-2">{rol.id}</td>
              <td className="border border-gray-300 p-2">{rol.rol}</td>
              <td className="border border-gray-300 p-2">{rol.estado ? "Activo" : "Inactivo"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para agregar rol */}
      <ModalAgregarRol isOpen={mostrarModalAgregar} onClose={cerrarModalAgregar} recargarRoles={recargarRoles} />
    </div>
  );
};

export default Roles;
