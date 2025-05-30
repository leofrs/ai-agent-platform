import { prisma } from "./prisma-config";

export interface IAgents {
  id: string;
  name: string;
  instructions: string;
}

class AgentsPrisma {
  async getAllAgents(): Promise<IAgents[]> {
    try {
      const agents = await prisma.agents.findMany({
        select: {
          id: true,
          name: true,
          instructions: true,
        },
      });
      return agents;
    } catch (error) {
      console.error("Error found at get all agents", error);
      return [];
    }
  }
}

export default new AgentsPrisma();
