"use client";
import { DialogSearch } from "@/components/dialog-search";
import { useDialog } from "@/context/dialog-context";
import { IAgents } from "@/db/agents-prisma";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LoaderCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableMeetings } from "@/components/table-meetings";
import { NewMeeting } from "@/components/new-meeting";

export default function MeettngsUserPage() {
  const { isOpen, setIsOpen } = useDialog();
  const [isOpenNewAgent, setIsOpenNewAgent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [agents, setAgents] = useState<IAgents[]>([]);

  const fetchMeetings = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/meetings");
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
    fetchMeetings();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full text-gray-800 font-sans">
        <div className="flex flex-col items-center justify-center bg-muteded rounded-lg shadow-lg p-6">
          <LoaderCircle className=" animate-spin h-16 w-16 text-blue-500" />

          <div className="flex flex-col gap-1">
            <h1 className="mt-6 text-xl font-semibold text-center">
              Carregando Reuniões
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
      <NewMeeting isOpen={isOpenNewAgent} setIsOpen={setIsOpenNewAgent} />

      <div className="w-full flex justify-between items-center mb-4">
        <h1>Minha Reuniões</h1>
        <Button
          className="flex gap-2 cursor-pointer"
          onClick={() => setIsOpenNewAgent(!isOpenNewAgent)}
        >
          <Plus />
          Nova Reunião
        </Button>
      </div>

      {agents.length > 0 ? (
        <TableMeetings agents={agents} />
      ) : (
        <div className="flex justify-center items-center h-[calc(100vh-200px)] text-gray-800 font-sans">
          <div className="flex flex-col gap-1">
            <h1 className="mb-2 text-xl font-semibold text-center">
              Crie uma reunião
            </h1>

            <p className="text-sm text-gray-600 text-center max-w-md">
              Crie uma reunião e selecione o agente que vai lhe acompanhar nela.
              Em cada reunião você pode escolher o agente que desejar.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
