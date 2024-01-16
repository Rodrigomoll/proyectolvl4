import React, { useState } from "react";
import { PersonalInfo } from "./PersonalInfo";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario: usuario,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Credenciales incorrectas. Verifica tu usuario y contraseña.');
      }

      const data = await response.json();
      const token = data.token;

      console.log("Token de acceso", token);

      localStorage.setItem("authToken", token);
      setLoginSuccess(true); // Establece el estado de inicio de sesión exitoso
    } catch (error) {
      console.error("Error", error.message);
      setError(error.message);
    }
  };

  // Si el inicio de sesión fue exitoso, renderiza el componente PersonalInfo
  if (loginSuccess) {
    return <PersonalInfo />;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-left">Login</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <label className="block mb-4">
        <span className="text-gray-700">Usuario:</span>
        <input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Contraseña:</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </label>
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full"
      >
        Iniciar Sesión
      </button>
    </div>
  );
};

export { Login };
