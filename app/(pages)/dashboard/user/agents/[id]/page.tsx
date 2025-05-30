"use client";
import { IAgents } from "@/db/agents-prisma";
import { Bot } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

async function getAgentById(id: string): Promise<IAgents | null> {
  const agents: IAgents[] = [
    { id: "trind", name: "Agent 1", instructions: "You are an agent" },
    { id: "smith", name: "Agent 2", instructions: "Act like a detective" },
  ];
  return agents.find((agent) => agent.id === id) ?? null;
}

export default async function AgentsIdPage() {
  const { id } = useParams();
  const [agent, setAgent] = useState<IAgents | null>(null);

  useEffect(() => {
    if (typeof id === "string") {
      getAgentById(id).then(setAgent);
    }
  }, [id]);

  if (!agent) return <p>not found</p>;
  return (
    <main className="p-4 flex flex-col gap-4 bg-muted h-full">
      <Link href="/dashboard/user/agents">{"<--"} Voltar</Link>

      <div className="flex gap-2 items-center">
        <h2>Meus agentes {"-->"}</h2>
        <p>{agent.name}</p>
      </div>

      <div
        key={agent.id}
        className="border border-black rounded-lg p-4 mb-4 bg-white flex gap-4 items-center"
      >
        <p className="flex gap-2 items-center">
          <Bot /> <span>{agent.name}</span>
        </p>
        <p className="mt-2">ID: {agent.id}</p>
        <p className="mt-2 text-gray-600">Instrução: {agent.instructions}</p>
      </div>
    </main>
  );
}
