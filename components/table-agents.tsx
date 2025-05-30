import { IAgents } from "@/db/agents-prisma";
import { Bot } from "lucide-react";
import { useRouter } from "next/navigation";

interface ITableAgents {
  agents: IAgents[];
}

export function TableAgents(props: ITableAgents) {
  const { agents } = props;
  const router = useRouter();
  return (
    <div className="overflow-y-auto h-[calc(100vh-200px)]">
      {agents.map((agent) => (
        <div
          key={agent.id}
          className="border border-black rounded-lg p-4 mb-4 cursor-pointer"
          onClick={() => router.push(`agents/${agent.id}`)}
        >
          <p className="flex gap-2 items-center">
            <Bot /> <span>{agent.name}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
