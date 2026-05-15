

"use client";
<a
  href="http://localhost:3001/api/leads/export/csv"
  target="_blank"
  className="bg-black text-white px-4 py-2 rounded-lg inline-block mb-4"
>
  Exportar Excel
</a>
import { useEffect, useState } from "react";

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/leads");
      const data = await response.json();

      setLeads(data.data);
    } catch (error) {
      console.error("Error obteniendo leads", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-black">
          Panel Administrativo
        </h1>

        <a
          href="http://localhost:3001/api/leads/export/csv"
           target="_blank"
            className="bg-black text-white px-4 py-2 rounded-lg inline-block mb-4">
            Exportar CSV
          </a>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-black text-white">
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Apellido</th>
                <th className="p-3 text-left">Correo</th>
                <th className="p-3 text-left">Teléfono</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b">
                  <td className="p-3 text-black">{lead.firstName}</td>
                  <td className="p-3 text-black">{lead.lastName}</td>
                  <td className="p-3 text-black">{lead.email}</td>
                  <td className="p-3 text-black">{lead.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}