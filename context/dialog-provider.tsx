"use client";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { DialogContext } from "./dialog-context";

type Props = {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export function DialogProvider({ children, isOpen, setIsOpen }: Props) {
  return (
    <DialogContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DialogContext.Provider>
  );
}
