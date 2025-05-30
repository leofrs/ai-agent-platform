"use client";
import { DialogSearch } from "@/components/dialog-search";
import { useDialog } from "@/context/dialog-context";

export default function AgentsUserPage() {
  const { isOpen, setIsOpen } = useDialog();
  return (
    <div>
      <DialogSearch isOpen={isOpen} setIsOpen={setIsOpen} />

      <h1>Agents User Page</h1>
    </div>
  );
}
