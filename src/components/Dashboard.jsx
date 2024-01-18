import React, { useState } from "react";
import { Link } from "react-router-dom";
import Roles from "./Roles";
import Usuarios from "./Usuarios";
import Bitacoras from "./Bitacoras";
import Paginas from "./Paginas";

const Dashboard = () => {
  const [tablaSeleccionada, setTablaSeleccionada] = useState(null);

  const mostrarTabla = (tabla) => {
    setTablaSeleccionada(tabla);
  };

  return (
    <div className="flex">
      {/* Menú lateral */}
      <div className="bg-gray-700 w-1/5 h-screen p-4 text-white text-lg flex flex-col items-center">
        <div className="flex items-center mb-4">
          <h1 className="text-lg font-semibold">Universidad</h1>
        </div>
        <h2 className="my-4 text-center text-lg font-semibold">Menú</h2>
        <ul className="mt-4">
          <li>
            <button
              onClick={() => mostrarTabla("roles")}
              className="flex items-center block text-center py-2 hover:bg-gray-600"
            >
              <i className="fas fa-shield-alt mr-2"></i> Roles
            </button>
          </li>
          <li>
            <button
              onClick={() => mostrarTabla("usuarios")}
              className="flex items-center block text-center py-2 hover:bg-gray-600"
            >
              <i className="fas fa-user mr-2"></i> Usuarios
            </button>
          </li>
          <li>
            <button
              onClick={() => mostrarTabla("bitacoras")}
              className="flex items-center block text-center py-2 hover:bg-gray-600"
            >
              <i className="fas fa-user mr-2"></i> Bitacoras
            </button>
          </li>
          <li>
            <button
              onClick={() => mostrarTabla("paginas")}
              className="flex items-center block text-center py-2 hover:bg-gray-600"
            >
              <i className="fas fa-user mr-2"></i>Páginas
            </button>
          </li>
        </ul>
      </div>

      <div className="bg-gray-200 w-4/5 h-screen">
        <header className="bg-gray-500 p-4 text-white flex justify-between items-center">
          <h1 className="text-lg font-semibold">Bienvenido al dashboard</h1>
          <Link to="/login" className="text-sm hover:underline">
            Cerrar Sesión
          </Link>
        </header>
        {tablaSeleccionada === "roles" && <Roles />}
        {tablaSeleccionada === "usuarios" && <Usuarios />}
        {tablaSeleccionada === "bitacoras" && <Bitacoras />}
        {tablaSeleccionada === "paginas" && <Paginas />}
      </div>
    </div>
  );
};

export default Dashboard;
