"use client";
import { DialogSearch } from "@/components/dialog-search";
import { useDialog } from "@/context/dialog-context";
import { IAgents } from "@/db/agents-prisma";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

export default function AgentsUserPage() {
  const { isOpen, setIsOpen } = useDialog();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [agents, setAgents] = useState<IAgents[]>([]);

  const fetchAgents = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/agents");
      const resData = await res.json();

      if (!res.ok) {
        toast(resData.message, {
          position: "top-right",
          style: {
            backgroundColor: "#f44336",
            color: "white",
          },
        });
        return;
      }

      setAgents(resData);
    } catch (error) {
      console.error("Error fetching agents:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full text-gray-800 font-sans">
        <div className="flex flex-col items-center justify-center bg-muteded rounded-lg shadow-lg p-6">
          <LoaderCircle className=" animate-spin h-16 w-16 text-blue-500" />

          <div className="flex flex-col gap-1">
            <h1 className="mt-6 text-xl font-semibold text-center">
              Carregando Agentes
            </h1>

            <p className="text-sm text-gray-600 text-center max-w-md">
              Isso pode levar alguns segundos, por favor aguarde.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <DialogSearch isOpen={isOpen} setIsOpen={setIsOpen} />

      <h1>Agents User Page</h1>

      {agents.length > 0 ? (
        <ul className="text-black">
          {agents.map((agent) => (
            <li key={agent.id}>Name of agente: {agent.name}</li>
          ))}
        </ul>
      ) : (
        <p>No agents found.</p>
      )}
    </div>
  );
}
