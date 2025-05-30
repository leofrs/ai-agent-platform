import { IAgents } from "@/db/agents-prisma";
import { Headset } from "lucide-react";
import { useRouter } from "next/navigation";

interface ITableMeetings {
  agents: IAgents[];
}

export function TableMeetings(props: ITableMeetings) {
  const { agents } = props;
  const router = useRouter();
  return (
    <div className="overflow-y-auto h-[calc(100vh-200px)]">
      {agents.map((agent) => (
        <div
          key={agent.id}
          className="border border-black rounded-lg p-4 mb-4 cursor-pointer"
          onClick={() => router.push(`meetings/${agent.id}`)}
        >
          <p className="flex gap-2 items-center">
            <Headset /> <span>{agent.name}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
