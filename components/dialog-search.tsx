import {
  CommandDialog,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Dispatch, SetStateAction } from "react";

export interface IDialogSearchProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function DialogSearch(props: IDialogSearchProps) {
  const { isOpen, setIsOpen } = props;
  return (
    <>
      {isOpen && (
        <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
          <CommandInput placeholder="Encontre o agente adequado..." />

          <CommandList>
            <CommandItem>Test</CommandItem>
          </CommandList>
        </CommandDialog>
      )}
    </>
  );
}
