import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { NewMeetingForm } from "./new-meeting-form";
import { toast } from "sonner";
import { IAgents } from "@/db/agents-prisma";

export interface INewAgentProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function NewMeeting(props: INewAgentProps) {
  const { isOpen, setIsOpen } = props;
  const [agents, setAgents] = useState<IAgents[]>([]);

  const fetchAgents = async () => {
    try {
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
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);
  return (
    <>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Nova Reunião</DialogTitle>
              <DialogDescription>Crie uma nova reunião</DialogDescription>
            </DialogHeader>

            <NewMeetingForm
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              agents={agents}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
