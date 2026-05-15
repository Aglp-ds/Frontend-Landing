"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
        }),
      });

      if (response.ok) {

        router.push("/admin");
      } else {
        setMessage("Error al enviar lead");
      }
    } catch (error) {
      setMessage("Error de conexión con el servidor");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-2 text-center text-black">
          Sistema de Leads
        </h1>

        <p className="text-gray-600 text-center mb-6">
          Completa el formulario para registrarte
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full border p-3 rounded-lg text-black"
            required
          />

          <input
            type="text"
            placeholder="Apellido"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full border p-3 rounded-lg text-black"
          />

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded-lg text-black"
            required
          />

          <input
            type="text"
            placeholder="Teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border p-3 rounded-lg text-black"
            required
          />

          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition"
          >
            Enviar
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-green-600 font-medium">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}