import { prisma } from "./prisma-config";

export interface IMetting {
  id: string;
  name: string;
  status: string;
  user_id: string;
  agent_id: string;
}

class MeetingPrisma {
  async getAllAgents(): Promise<IMetting[]> {
    try {
      const meetings = await prisma.meetings.findMany({
        select: {
          id: true,
          name: true,
          status: true,
          user_id: true,
          agent_id: true,
        },
      });
      return meetings;
    } catch (error) {
      console.error("Error found at get all agents", error);
      return [];
    }
  }
}

export default new MeetingPrisma();
