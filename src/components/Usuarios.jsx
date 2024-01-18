import React, { useEffect, useState } from "react";
import ModalAgregarUsuario from "./ModalAgregarUsuario";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarModalAgregar, setMostrarModalAgregar] = useState(false);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/usuarios");
        if (response.ok) {
          const data = await response.json();
          setUsuarios(data);
        } else {
          console.error("Error al obtener usuarios:", response.statusText);
        }
      } catch (error) {
        console.error("Error al obtener usuarios:", error.message);
      }
    };

    fetchUsuarios();
  }, []);

  const abrirModalAgregar = () => {
    setMostrarModalAgregar(true);
  };

  const cerrarModalAgregar = () => {
    setMostrarModalAgregar(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Lista de Usuarios</h2>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            abrirModalAgregar();
          }}
          className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Agregar Usuario
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Nombre</th>
            <th className="border border-gray-300 p-2">Apellido</th>
            <th className="border border-gray-300 p-2">Usuario</th>
            <th className="border border-gray-300 p-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td className="border border-gray-300 p-2">{usuario.id}</td>
              <td className="border border-gray-300 p-2">{usuario.primerNombre} {usuario.segundoNombre}</td>
              <td className="border border-gray-300 p-2">{usuario.primerApellido} {usuario.segundoApellido}</td>
              <td className="border border-gray-300 p-2">{usuario.usuario}</td>
              <td className="border border-gray-300 p-2">{usuario.estado ? "Activo" : "Inactivo"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalAgregarUsuario isOpen={mostrarModalAgregar} onClose={cerrarModalAgregar} />
    </div>
  );
};

export default Usuarios;