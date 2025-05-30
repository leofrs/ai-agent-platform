"use client";
import { DialogSearch } from "@/components/dialog-search";
import { useDialog } from "@/context/dialog-context";
import { IAgents } from "@/db/agents-prisma";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LoaderCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewAgent } from "@/components/new-agent";
import { TableAgents } from "@/components/table-agents";

export default function AgentsUserPage() {
  const { isOpen, setIsOpen } = useDialog();
  const [isOpenNewAgent, setIsOpenNewAgent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    <main className="bg-muted h-full p-4">
      <DialogSearch isOpen={isOpen} setIsOpen={setIsOpen} />
      <NewAgent isOpen={isOpenNewAgent} setIsOpen={setIsOpenNewAgent} />

      <div className="w-full flex justify-between items-center mb-4">
        <h1>Meus Agentes</h1>
        <Button
          className="flex gap-2 cursor-pointer"
          onClick={() => setIsOpenNewAgent(!isOpenNewAgent)}
        >
          <Plus />
          Novo Agente
        </Button>
      </div>

      {agents.length > 0 ? (
        <TableAgents agents={agents} />
      ) : (
        <div className="flex justify-center items-center h-[calc(100vh-200px)] text-gray-800 font-sans">
          <div className="flex flex-col gap-1">
            <h1 className="mb-2 text-xl font-semibold text-center">
              Crie o seu primeiro agente
            </h1>

            <p className="text-sm text-gray-600 text-center max-w-md">
              Crie um agente para monitorar, resumir e lhe instruir com detalhes
              importantes. Em cada reunião você pode escolher o agente que
              desejar.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
