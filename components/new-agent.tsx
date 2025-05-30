import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { NewAgentForm } from "./new-agent-form";

export interface INewAgentProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function NewAgent(props: INewAgentProps) {
  const { isOpen, setIsOpen } = props;
  return (
    <>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Novo Agente</DialogTitle>
              <DialogDescription>Crie um novo agente</DialogDescription>
            </DialogHeader>

            <NewAgentForm isOpen={isOpen} setIsOpen={setIsOpen} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
