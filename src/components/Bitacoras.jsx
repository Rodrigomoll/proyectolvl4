
import React, { useEffect, useState } from "react";

const Bitacoras = () => {
  const [bitacoras, setBitacoras] = useState([]);

  useEffect(() => {
    const fetchBitacoras = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/bitacoras");
        if (response.ok) {
          const data = await response.json();
          setBitacoras(data);
        } else {
          console.error("Error al obtener bitácoras:", response.statusText);
        }
      } catch (error) {
        console.error("Error al obtener bitácoras:", error.message);
      }
    };

    fetchBitacoras();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Lista de Bitácoras</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Bitácora</th>
            <th className="border border-gray-300 p-2">Fecha</th>
            <th className="border border-gray-300 p-2">Hora</th>
          </tr>
        </thead>
        <tbody>
          {bitacoras.map((bitacora) => (
            <tr key={bitacora.id}>
              <td className="border border-gray-300 p-2">{bitacora.id}</td>
              <td className="border border-gray-300 p-2">{bitacora.bitacora}</td>
              <td className="border border-gray-300 p-2">{bitacora.fecha}</td>
              <td className="border border-gray-300 p-2">{bitacora.hora}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bitacoras;
