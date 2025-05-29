import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { X } from "lucide-react";

interface IDialogSearchProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function DialogSearch(props: IDialogSearchProps) {
  const { isOpen, setIsOpen } = props;
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full relative">
            <Command>
              <div className="flex gap-2 items-center justify-between">
                <CommandInput placeholder="Type a command or search..." />

                <X
                  size="20"
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                />
              </div>
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem>AI-model X</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </div>
      )}
    </>
  );
}
